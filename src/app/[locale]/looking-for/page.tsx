'use client'

import { Metadata } from 'next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import carsBackgroundDarkImg from '@/images/car-dark.png'
import carsBackgroundLightImg from '@/images/car-light.png'
import Breadcrumbs from '@/components/Breadcrumbs';
import LookingForHero from './(components)/LookingForHero';
import { ButtonClose, ButtonPrimary, ButtonSecondary } from '@/shared/Buttons';
import SectionSubscribe from '@/components/SectionSubscribe';
import { RadioButton } from '@/shared/FormInputs';

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

const carListFilter = [
  {
    name: 'Aston Martin',
    value: 'Aston Martin',
    selected: false
  },
  {
    name: 'Bentley',
    value: 'Bentley',
    selected: false
  },
  {
    name: 'BMW',
    value: 'BMW',
    selected: false
  },
  {
    name: 'MB',
    value: 'MB',
    selected: false
  },
  {
    name: 'Ford',
    value: 'Ford',
    selected: false
  },
  {
    name: 'Harley Davidson',
    value: 'Harley Davidson',
    selected: false
  },
  {
    name: 'Lamborghini',
    value: 'Lamborghini',
    selected: false
  },
  {
    name: 'Land Rover',
    value: 'Land Rover',
    selected: false
  },
  {
    name: 'Ferrari',
    value: 'Ferrari',
    selected: false
  },
  {
    name: 'Mclaren',
    value: 'Mclaren',
    selected: false
  },
  {
    name: 'Mercedes',
    value: 'Mercedes',
    selected: false
  },
  {
    name: 'Porshe',
    value: 'Porshe',
    selected: false
  },
  {
    name: 'Rolls-Royce',
    value: 'Rolls-Royce',
    selected: false
  },
];

const carData = [
  {
    date: '17/02/2025',
    manufYear: '2024–25',
    brand: 'MB',
    model: 'GLC Coupe 200d/220d/300d',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 1,
    comments: 'Burmester Sound',
  },
  {
    date: '17/02/2025',
    manufYear: '2024–25',
    brand: 'MB',
    model: 'G63',
    exteriorColor: 'Magno Black',
    interiorColor: 'Red',
    qty: 1,
    comments: '-',
  },
  {
    date: '17/02/2025',
    manufYear: '2024–25',
    brand: 'MB',
    model: 'G63',
    exteriorColor: 'Olive Green or Grey',
    interiorColor: 'Red',
    qty: 1,
    comments: '-',
  },
  {
    date: '17/02/2025',
    manufYear: '2024–25',
    brand: 'MB',
    model: 'G63',
    exteriorColor: 'Black',
    interiorColor: 'Black',
    qty: 1,
    comments: 'A22, II Night Pack, Carbon Exterior&Interior',
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'Lamborghini',
    model: 'X3 20dUrus Performante',
    exteriorColor: 'Black',
    interiorColor: 'Black',
    qty: 1,
    comments: 'Panorama',
  },
  {
    date: '17/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'X3 20d',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 1,
    comments: 'Simple Options',
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'Lamborghini',
    model: 'X3 20dUrus Performante',
    exteriorColor: 'Black',
    interiorColor: 'Black',
    qty: 1,
    comments: 'Panorama'
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'M5',
    exteriorColor: 'Black or Silver',
    interiorColor: 'Black or White',
    qty: 1,
    comments: '-'
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'X7 40d',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 2,
    comments: '-'
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'X6M',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 1,
    comments: '-'
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'X6 30d/40d',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 1,
    comments: '-'
  },
  {
    date: '14/02/2025',
    manufYear: '2024–25',
    brand: 'BMW',
    model: 'X5 30d/40d',
    exteriorColor: 'Any',
    interiorColor: 'Any',
    qty: 1,
    comments: '-'
  }
];

const metadata: Metadata = {
  title: 'Looking for',
  description:
    'Looking for',
};

const PageLookingFor = () => {
  const { isDarkMode, mounted } = useThemeMode();
  const translate = useTranslations();
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [filteredCarList, setFilteredCarList] = useState<any[]>(carData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if(selectedCars.length > 0) {
      const filteredCars = carData.filter((car, index, self) => 
        selectedCars.includes(car.brand) && index === self.findIndex(c => c.brand === car.brand && c.model === car.model)
      );
      setFilteredCarList(filteredCars);
    } else {
      setFilteredCarList(carData);
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
  
  return (
    <div className={`nc-PageLookingFor relative overflow-hidden`}>
      <div className='container mt-8'>
        <Breadcrumbs 
          pages={lookingForPages}
        />

        <div className='flex mt-4 mb-14'>
          <div className='flex-1'>
            <LookingForHero translate={translate} />
          </div>
          <div className='flex flex-col justify-end'>
            <div className='relative'>
              <ButtonSecondary bg='bg-transparent' onClick={() => setShowFilterDropDown(!showFilterDropDown)}>
                {translate('lookingFor.filter.button.filters')}
              </ButtonSecondary>
                {showFilterDropDown &&
                  <>
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setShowFilterDropDown(false)}
                    />
                    <div className="absolute p-10 top-full right-0 z-40 mt-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg w-[430px]">
                      <p className='text-2xl text-center lg:text-4xl font-semibold text-neutral-1050 dark:text-neutral-200'>{translate('lookingFor.filter.button.filters')}</p>
                      <span className='absolute right-0 top-0 p-1'>
                        <ButtonClose onClick={() => setShowFilterDropDown(!showFilterDropDown)} />
                      </span>
                      <div className='flex flex-col gap-4 my-9 max-h-[600px] overflow-y-auto pr-2'>
                        {carListFilter.map((car, index) => 
                          <div key={index} className='flex items-center'>
                            <RadioButton 
                              name={car.name}
                              label={car.value}
                              sizeStyle='w-4 h-4'
                              borderStyle='rounded-sm'
                              onChange={() => handleToggleSelectedCar(car.name)}
                              checked={selectedCars.includes(car.name)}
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

        <table className="hidden md:block table-auto w-full text-left border-collapse">
          <thead className="relative w-full border-b dark:border-neutral-1100 border-neutral-200 dark:bg-[#1C2B2D] bg-bg-[linear-gradient(to-right,_rgba(188,202,204,0),_rgba(188,202,204,1),_rgba(188,202,204,1),_rgba(188,202,204,0))] dark:text-secondary-950 text-primary-600 md:text-lg text-xl">
            <tr>
              <th className="md:pr-2 md:py-2 lg:py-4 border-r dark:border-neutral-1100 border-neutral-200 ">Date</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 border-r dark:border-neutral-1100 border-neutral-200 ">Manuf. <br /> year</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 border-r w-[160px] dark:border-neutral-1100 border-neutral-200  border-neutral-200">Brand</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 border-r w-[260px] dark:border-neutral-1100 border-neutral-200 ">Model</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 border-r dark:border-neutral-1100 border-neutral-200 ">Exterior <br /> Color</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 border-r dark:border-neutral-1100 border-neutral-200 ">Interior <br /> Color</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4 md:w-[40px] w-[80px] border-r dark:border-neutral-1100 border-neutral-200 ">Qty</th>
              <th className="md:px-2 md:py-2 lg:px-5 lg:py-4">Comments</th>
            </tr>
          </thead>
          <tbody className="dark:text-white w-full text-neutral-500 md:text-sm lg:text-lg">
            {filteredCarList.map((car, index) => (
              <tr key={index} className="border-t dark:border-neutral-1100 border-neutral-200 ">
                {Object.values(car).map((value:any, index) => (
                  <td key={index} className="first:px-0 first:pr-5 md:first:pr-2 md:px-2 md:py-2 lg:px-5 lg:py-3 last:border-r-0 border-r dark:border-neutral-1100 border-neutral-200 ">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex md:hidden flex-col gap-4 lg:gap-6 mb-8 md:mb-14'>
            {filteredCarList.map((car) => (
              <div className='flex w-[343px] gap-3 p-6 w-fit flex-col border dark:border-neutral-800 border-none dark:bg-neutral-950 bg-white rounded-2xl'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='dark:text-secondary-950 font-bold whitespace-nowrap w-[120px] text-primary-600'>Brand & Model</p><p className='text-neutral-1100 dark:text-white'>{`${car.brand}, ${car.model}`}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Manuf. year</p><p className='text-neutral-1100 dark:text-white'>{car.manufYear}</p>
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
                      <p className='text-primary-600 dark:text-secondary-950 font-bold whitespace-nowrap w-[120px]'>Exterior Color</p><p className='text-neutral-1100 dark:text-white'>{car.exteriorColor}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Interior Color</p><p className='text-neutral-1100 dark:text-white'>{car.interiorColor}</p>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='flex gap-4'>
                      <p className='text-primary-600 dark:text-secondary-950 font-bold w-[120px]'>Quantitiy</p><p className='text-neutral-1100 dark:text-white'>{car.qty}</p>
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
