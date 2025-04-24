'use client'

import { Metadata } from 'next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import Breadcrumbs from '@/components/Breadcrumbs';
import LookingForHero from './(components)/LookingForHero';
import { ButtonClose, ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import SectionSubscribe from '@/components/SectionSubscribe';
import { RadioButton } from '@/shared/FormInputs';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { getLookingForList } from '@/api/looking-for';
import useQueryParams from '@/hooks/useQueryParams';
import { ILookingForCar } from '@/types/lookingFor';
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png'

const lookingForPages = [
  {
    pageName: 'Main',
    pageHref: '/'
  },
  {
    pageName: 'We are looking for',
    pageHref: '/looking-for'
  }
];

const metadata: Metadata = {
  title: 'Looking for',
  description:
    'Looking for',
};

const PageLookingFor = () => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [lookingForData, setLookingForData] = useState<ILookingForCar[]>([]);
  const [filteredCarList, setFilteredCarList] = useState<ILookingForCar[]>(lookingForData);
  
  const locale = useLocale();
  const translate = useTranslations();
  const { isDarkMode, mounted } = useThemeMode();
  const { currentPage } = useQueryParams();

  const cellTHeadClass = "flex shrink grow basis-0 py-3 px-2 lg:px-4 min-w-0 font-bold dark:text-secondary-950 text-primary-600 border-r dark:border-neutral-1100 border-neutral-200 md:text-base lg:text-xl";
  const cellTBodyClass = "flex shrink grow basis-0 py-3 px-2 lg:px-4 text-ellipsis overflow-hidden min-w-0 font-normal dark:text-white text-neutral-500 border-r dark:border-neutral-1100 border-neutral-200 md:text-sm lg:text-base xl:text-lg";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getLookingForList(currentPage, 10, locale)
    .then((data) => {
      if (data) {
        setLookingForData(data);
        setFilteredCarList(data);
      } else {
        setError(true);
      }
    })
    .finally(() => {
      isFirstLoading && setFirstLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    if(selectedCars.length > 0) {
      const filteredCars = lookingForData.filter((car, index, self) => 
        selectedCars.includes(car.brand) && index === self.findIndex(c => c.brand === car.brand && c.model === car.model)
      );
      setFilteredCarList(filteredCars);
    } else {
      setFilteredCarList(lookingForData);
    }
  }, [selectedCars]);
  
  if (!mounted) return null;

  const handleToggleSelectedCar = (carName: string) => {
    setSelectedCars((prev) => 
      prev.includes(carName)  
        ? prev.filter((name) => name !== carName)
        : [...prev, carName]
    );
  }
  
  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <div className={`nc-PageLookingFor relative overflow-hidden`}>
      <BackgroundShaadowSection 
        className=' dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -right-[350px] top-[14%]' 
      />
      <Image 
        src={triangleBackgroundImgThird} 
        alt='triangle background'
        className='absolute rotate-3 bottom-[3%] -left-[8px] sm:-bottom-[25%] lg:-bottom-[65%] lg:-left-[22px] -z-10'
      />
      <div className='container mt-8'>
        <Breadcrumbs 
          pages={lookingForPages}
        />

        <div className='flex flex-col gap-3 md:gap-0 md:flex-row mt-4 mb-14'>
          <div className='flex-1'>
            <LookingForHero translate={translate} />
          </div>
          <div className='flex md:flex-col justify-end'>
            <div className='relative flex w-full'>
              <ButtonSecondary bg='ml-auto bg-transparent dark:bg-transparent' onClick={() => setShowFilterDropDown(!showFilterDropDown)}>
                {translate('lookingFor.filter.button.filters')}
              </ButtonSecondary>
                {showFilterDropDown &&
                  <>
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setShowFilterDropDown(false)}
                    />
                    <div className="absolute p-10 top-full right-0 z-40 mt-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg w-full lg:w-[430px]">
                      <p className='text-2xl text-center lg:text-4xl font-semibold text-neutral-1050 dark:text-neutral-200'>{translate('lookingFor.filter.button.filters')}</p>
                      <span className='absolute right-0 top-0 p-1'>
                        <ButtonClose onClick={() => setShowFilterDropDown(!showFilterDropDown)} />
                      </span>
                      <div className='flex flex-col gap-4 my-9 max-h-[600px] overflow-y-auto pr-2'>
                        {lookingForData?.map((car, index) => 
                          <div key={index} className='flex items-center'>
                            <RadioButton 
                              name={car.brand}
                              label={car.brand}
                              sizeStyle='w-4 h-4'
                              borderStyle='rounded-sm'
                              onChange={() => handleToggleSelectedCar(car.brand)}
                              checked={selectedCars.includes(car.brand)}
                            />
                          </div>
                        )}
                      </div>
                      <ButtonPrimary 
                        className='w-full'
                        onClick={() => {}}
                      >
                        {translate('lookingFor.filter.button.apply')}
                      </ButtonPrimary>
                    </div>
                  </>
                }
            </div>
          </div>
        </div>

        <div className='flex gap-4 mt-7 mb-6'>
          {selectedCars.length > 0 && 
            selectedCars.map((selectedCarName) => (
              <ButtonSecondary className='sm:py-2 sm:text-sm lg:text-lg' bg='bg-transparent'>
                {selectedCarName}
                <ButtonClose className='ml-2 text-primary-600 dark:text-primary-950' onClick={() => handleToggleSelectedCar(selectedCarName)} />
              </ButtonSecondary>
            ))
          } 
        </div>

        <div className='hidden md:block'>
          <div 
            className='flex w-full border-b dark:bg-[#1C2B2D] dark:border-neutral-1100 border-neutral-200'
            style={{
              background: isDarkMode
              ? undefined
              : 'linear-gradient(90deg, rgba(188, 202, 204, 0) 0%, rgba(188, 202, 204, 1) 30%, rgba(188, 202, 204, 1) 70%, rgba(188, 202, 204, 0) 100%)'
            }}  
          >
            <>
              <div className={`${cellTHeadClass} lg:grow-0 lg:basis-[120px] xl:basis-0 xl:grow text-center`}>
                Date
              </div>
              <div className={cellTHeadClass}>
                Manuf. <br /> year
              </div>
              <div className={cellTHeadClass}>
                Brand
              </div>
              <div className={cellTHeadClass}>
                Model
              </div>
              <div className={cellTHeadClass}>
                Exterior <br /> Color
              </div>
              <div className={cellTHeadClass}>
                Interior <br /> Color
              </div>
              <div className={`${cellTHeadClass} basis-[45px] lg:basis-[70px] grow-0 xl:basis-0 xl:grow text-center`}>
                Qty
              </div>
              <div className={`${cellTHeadClass} border-r-0`}>
                Comments
              </div>
            </>
          </div>
          {filteredCarList.map((car, index) => (
            <div key={index} className="flex w-full border-b dark:border-neutral-1100 border-neutral-200">
              <div className={`${cellTBodyClass} lg:basis-[120px] xl:basis-0 lg:grow-0 xl:grow text-center`}>{car.date}</div>
              <div className={cellTBodyClass}>{car.my}</div>
              <div className={cellTBodyClass}>{car.brand}</div>
              <div className={cellTBodyClass}>{car.model}</div>
              <div className={cellTBodyClass}>{car.color_exterior}</div>
              <div className={cellTBodyClass}>{car.color_interior}</div>
              <div className={`${cellTBodyClass} basis-[45px] grow-0 xl:basis-0 lg:basis-[70px] xl:grow text-center`}>{car.count}</div>
              <div className={`${cellTBodyClass} border-r-0 `}>{car.comments}</div>
            </div>
          ))}
        </div>

        <div className='flex md:hidden items-center flex-col gap-4 lg:gap-6 mb-8 md:mb-14'>
            {filteredCarList.map((car, index) => (
              <div key={index} className='flex max-w-[443px] w-full gap-3 p-6 flex-col border dark:border-neutral-800 border-none dark:bg-neutral-950 bg-white rounded-2xl'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='dark:text-secondary-950 font-bold whitespace-nowrap w-[120px] text-primary-600'>Brand & Model</p><p className='text-neutral-1100 dark:text-white'>{`${car.brand}, ${car.model}`}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Manuf. year</p><p className='text-neutral-1100 dark:text-white'>{car.my}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Date</p><p className='text-neutral-1100 dark:text-white'>{car.date}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col py-3 gap-3 border-b border-t border-neutral-200 dark:border-neutral-1100'>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold whitespace-nowrap w-[120px]'>Exterior Color</p><p className='text-neutral-1100 dark:text-white'>{car.color_exterior}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Interior Color</p><p className='text-neutral-1100 dark:text-white'>{car.color_interior}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Quantitiy</p><p className='text-neutral-1100 dark:text-white'>{car.count}</p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex gap-4'>
                    <p className='text-primary-600 dark:text-secondary-950 font-bold whitespace-nowrap w-[120px]'>Comments</p><p className='text-neutral-1100 dark:text-white'>{car.comments}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className='relative mt-56 pt-16 mb-24 lg:md-32'>
          <SectionSubscribe translate={translate} />
        </div>
      </div>
      <div className='hidden relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full'>
        <Image 
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg } 
          alt='cars image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default PageLookingFor;
