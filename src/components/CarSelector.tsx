'use client';

import { getSubscriptions, setSubscriptions } from "@/api/subscribe";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useThemeMode } from "@/hooks/useThemeMode";
import { IBrand, ICarData, ICarDataToRequest, IModel } from "@/types/user";
import { useEffect, useState, ChangeEvent } from "react";
import ErrorComponent from "./ErrorComponent";
import LoadingSpinner from "@/shared/LoadingSpinner";
import { ButtonPrimary } from "@/shared/Buttons";
import { IoIosClose } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";


const CarSelector = () => { 
  const translate = useTranslations();
  const locale = useLocale();
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [cars, setCars] = useState<ICarData>([]);
  const [filteredCars, setFilteredCars] = useState<ICarData>([]);
  const [tagsToRequest, setTagsToRequest] = useState<ICarDataToRequest<number>[]>([]);
  const [tagsToDisplay, setTagsToDisplay] = useState<ICarDataToRequest<string>[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const { currentPage } = useQueryParams();
  
  const filterCars = () => { 
    const filtered = 
        cars.map((car) => {
          const searchedCar = tagsToRequest.find(el => el.brand_id === car.brand_id)
          if(!searchedCar) {
            return car
          } else {
            if (car.models.length !== searchedCar.models.length) {
              return { 
                ...car,
                models: car.models.filter(el => !searchedCar.models.includes(el.model_id))
              }
            }
          }
          return null;
        }).filter(car => car !== null); 

    return filtered
  }

  const updateTagsModel = <T extends string | number>(tags: ICarDataToRequest<T>[], tagId: number, index: number): ICarDataToRequest<T>[] => {
    return tags.map(tag => {
      if (tag.brand_id === tagId) {
        const newModels = tag.models.filter((_, i) => i !== index);
        return { ...tag, models: newModels };
      }
      return tag;
    });
  };

  const updateTags = <T extends string | number>(tags: ICarDataToRequest<T>[]): ICarDataToRequest<T>[] | [] => {
    return tags.filter((tag) => tag.models.length > 0);
  }

  useEffect(() => {
    if (isFirstLoading && locale) {
      setLoading(true);
      getSubscriptions(locale)
        .then((data) => {
          if (data) {
            const cars = data as ICarData;
            let selectedCars = cars.filter((car) => car.is_all_models_selected || car.is_selected);

            let filteredCars = selectedCars.map((selectedCar) => {
              if(selectedCar.is_all_models_selected) {
                return selectedCar;
              } else {
                const selectedModels = selectedCar.models.filter((selectModels) => selectModels.is_selected)
                return { ...selectedCar, models: selectedModels };
              }
            }).filter(car => car !== null); 

            const toRequest = filteredCars.map((car) => {
              const newCarDataToRequest = {
                brand_id: car.brand_id,
                models: car.models.map((models: IModel) => models.model_id)
              }
              return newCarDataToRequest;
            })
            const toDisplay = filteredCars.map((car) => {
              const newCarDataToRequest = {
                brand_id: car.brand_id,
                models: car.models.map((models: IModel) => models.model_name)
              }
              return newCarDataToRequest;
            })
            setCars(cars);
            setFilteredCars(cars);
            setTagsToRequest(toRequest);
            setTagsToDisplay(toDisplay);
          } else {
            setError(true);
          }
        })
        .finally(() => {
          setLoading(false);
          isFirstLoading && setFirstLoading(false);
        });
    }
  }, [currentPage, isFirstLoading, locale]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '') {
      if (tagsToRequest.length > 0) {
        const lastTag = tagsToRequest[tagsToRequest.length - 1];
        if (lastTag.models.length > 0) {
          handleRemoveTag(lastTag.brand_id, lastTag.models.length - 1);
        }
      }
    }
  };

  const handleAddTag = (car: IBrand) => {
    const exitingTag = tagsToRequest.find((tag) => tag.brand_id === car.brand_id); 
    const exitingTagToDisplay = tagsToDisplay.find((tag) => tag.brand_id === car.brand_id); 

    let newCarDataToRequest: ICarDataToRequest<number>;
    let newCarDataToDisplay: ICarDataToRequest<string>;
    
    if(exitingTag) {
      const carModel = car.models.map((models: IModel) => models.model_id);
      newCarDataToRequest = {
        brand_id: exitingTag.brand_id,
        models: [...exitingTag.models, ...carModel]
      }
      const newTagsToRequest = [...tagsToRequest]
      let searchingIndex = 0
      newTagsToRequest.forEach((el, index) => {
        if(el.brand_id === car.brand_id) {
          searchingIndex = index
        }
      })
      newTagsToRequest[searchingIndex] = newCarDataToRequest
      setTagsToRequest(newTagsToRequest);
    } else {
      newCarDataToRequest = {
        brand_id: car.brand_id,
        models: car.models.map((models: IModel) => models.model_id)
      }
      setTagsToRequest([...tagsToRequest, newCarDataToRequest]);
    }

    if(exitingTagToDisplay) {
      const carModel = car.models.map((models: IModel) => models.model_name);
      newCarDataToDisplay = {
        brand_id: exitingTagToDisplay.brand_id,
        models: [...exitingTagToDisplay.models, ...carModel]
      }
      const newTagsToDisplay = [...tagsToDisplay]
      let searchingIndex = 0
      newTagsToDisplay.forEach((el, index) => {
        if(el.brand_id === car.brand_id) {
          searchingIndex = index
        }
      })
      newTagsToDisplay[searchingIndex] = newCarDataToDisplay
      setTagsToDisplay(newTagsToDisplay);
    } else {
      newCarDataToDisplay = {
        brand_id: car.brand_id,
        models: car.models.map((models: IModel) => models.model_name)
      }
      setTagsToDisplay([...tagsToDisplay, newCarDataToDisplay]);
    }
    setInputValue("");
    setIsShowDropdown(false);
  };

  const handleAddTagModel = (car: IBrand, modelId: number) => {
    const existingTag = tagsToRequest.find(tag => tag.brand_id === car.brand_id);
    const existingTagDisplay = tagsToDisplay.find(tag => tag.brand_id === car.brand_id);
    
    let newCarDataToRequest: ICarDataToRequest<number>;
    
    if (existingTag) {
      newCarDataToRequest = {
        brand_id: car.brand_id,
        models: [...existingTag.models, modelId]
      };
      setTagsToRequest(
        tagsToRequest.map(tag =>
          tag.brand_id === car.brand_id ? newCarDataToRequest : tag
        )
      );
    } else {
      newCarDataToRequest = {
        brand_id: car.brand_id,
        models: [modelId]
      };
      setTagsToRequest([...tagsToRequest, newCarDataToRequest]);
    }

    if (existingTagDisplay) {
      setTagsToDisplay(
        tagsToDisplay.map(tag =>
          tag.brand_id === car.brand_id ? { ...tag, models: [...tag.models, car.models.find(model => model.model_id === modelId)?.model_name || ''] } : tag
        )
      );
    } else {
      setTagsToDisplay([...tagsToDisplay, { brand_id: car.brand_id, models: [car.models.find(model => model.model_id === modelId)?.model_name || ''] }]);
    }

    setInputValue("");
    setIsShowDropdown(false);
  };

  const handleRemoveTag = (tagId: number, index: number) => {
    const updatedTagsToRequest = updateTagsModel<number>(tagsToRequest, tagId, index);
    const updatedTagsToDisplay = updateTagsModel<string>(tagsToDisplay, tagId, index);
    
    const arrayToRequest = updateTags<number>(updatedTagsToRequest)
    const arrayToDisplay = updateTags<string>(updatedTagsToDisplay)
    setTagsToRequest([...arrayToRequest]);
    setTagsToDisplay([...arrayToDisplay]);
  };

  const handleOnSubmit = () => {
    tagsToRequest && 
      setSubscriptions(tagsToRequest)
      .then((data) => {
        if (data) {
          console.log(data)
        } else {
          setError(true);
        }
      })
  }

  useEffect(() => {
    if (inputValue.length > 0) {
      setFilteredCars(
        filteredCars.filter((car) =>
          car.brand_name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      //@ts-ignore
      setFilteredCars(filterCars())
    }
  }, [inputValue]);

  useEffect(() => {
    if (tagsToRequest.length >= 0) {
      //@ts-ignore
      setFilteredCars(filterCars())
    }
  }, [tagsToRequest]);

  return (
    <>
      {isLoading ? 
        (
          <div className='w-full h-96 flex justify-center items-center'>
            <div className='-mt-[76px]'>
              <LoadingSpinner className='w-12' />
            </div>
          </div>
        ) : isError ? (
          <ErrorComponent />
        ) : 
      (
        <div>
          <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
            <div className='relative flex w-full items-center lg:w-[90%] flex-wrap gap-1 border border-neutral-200 dark:border-neutral-1100 bg-white dark:bg-neutral-1150 rounded-full px-4 py-2'>
              {tagsToDisplay.map((tag) => (
                tag.models.map((model, index) => 
                  <div
                    key={index} 
                    className='px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-xl text-black dark:text-white inline-block bg-neutral-100 dark:bg-neutral-950'
                  >
                    <span className="flex items-center">
                      {model} 
                      <button 
                        onClick={() => handleRemoveTag(tag.brand_id, index)}
                        className="ml-1"
                      >
                        <IoIosClose />
                      </button>
                    </span>
                  </div>
                )
              ))}
              <input 
                type="text" 
                value={inputValue}
                className={`bg-white dark:bg-neutral-1150 border-none grow py-1 px-2 border-transparent focus:border-transparent focus:ring-0 focus-visible:outline-none text-2xl`}
                onChange={handleInputChange}
                onFocus={() => setIsShowDropdown(true)}
                onBlur={() => setIsShowDropdown(false)}
                onKeyDown={handleKeyDown}
                placeholder={translate('carSubscriptions.input.placeholder')}
              />
              {isShowDropdown && (
                <div className={`border left-0 top-[58px] w-[90%] border-neutral-200 mt-[1px] rounded-2xl absolute w-full bg-white z-10 max-h-[400px] overflow-y-auto dark:border-neutral-1100 dark:bg-neutral-1150`}>
                  {filteredCars.map((car) => (
                    <div key={car.brand_id} className={`cursor-pointer dropdown-item`}>
                      <div 
                        className='text-neutral-1050 dark:text-white dark:hover:text-black flex px-3 py-2 dark:hover:bg-neutral-1100 hover:bg-neutral-100 justify-between items-center'
                        onMouseDown={() => handleAddTag(car)}
                      >
                        <p>{car.brand_name} - {translate('carSubscriptions.models.title')}</p> 
                      </div>
                      <div className="px-4">
                        {car.models.map((model) => (
                          <div 
                            key={model.model_id} 
                            className='px-3 py-1 rounded-lg hover:bg-neutral-1100 dark:hover:neutral-300 text-neutral-600 dark:text-white dark:hover:text-black cursor-pointer'
                            onMouseDown={() => handleAddTagModel(car, model.model_id)}
                          >
                            <p>{translate('carSubscriptions.model.title')} {model.model_name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="h-14 w-full sm:w-fit">
              <ButtonPrimary
                className="h-full w-full sm:w-28"
                fontSize='text-base lg:text-lg font-medium'
                sizeClass='px-5 py-2 md:px-6 md:py-3'
                onClick={handleOnSubmit}
              >
                {translate('carSubscriptions.button.save')}
              </ButtonPrimary>
            </div>
          </div>
          {/* {isShowDropdown && (
            <div className={`border w-[90%] border-neutral-200 mt-[1px] rounded-2xl absolute w-full bg-white z-10 max-h-[400px] overflow-y-auto dark:border-neutral-700 dark:bg-neutral-950`}>
              {filteredCars.map((car) => (
                <div key={car.brand_id} className={`cursor-pointer dropdown-item`}>
                  <div 
                    className='text-neutral-1050 dark:text-white dark:hover:text-neutral-1050 flex px-3 py-2 dark:hover:bg-neutral-300 hover:bg-neutral-100 justify-between items-center'
                    onMouseDown={() => handleAddTag(car)}
                  >
                    <p>{car.brand_name} - All models</p> 
                  </div>
                  <div className="px-4">
                    {car.models.map((model) => (
                      <div 
                        key={model.model_id} 
                        className='px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:neutral-300 text-neutral-600 dark:text-white dark:hover:text-neutral-1050 cursor-pointer'
                        onMouseDown={() => handleAddTagModel(car, model.model_id)}
                      >
                        <p>Model: {model.model_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default CarSelector;
