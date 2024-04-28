'use client';

import { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { DEMO_CAR_LIST } from '@/data/carlist';
import Filter from './(components)/Filter';
import SortPanel from './(components)/SortPanel';
import CarList from './(components)/CarList';

const CarListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isGrid]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='relative overflow-hidden'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 lg:gap-6 pt-6'>
          <div className='hidden lg:block lg:col-span-4'>
            {isMobile ? (
              <Transition appear show={isFilterVisible} as={Fragment}>
                <Dialog
                  as='div'
                  className='relative z-50 overflow-hidden'
                  onClose={() => setFilterVisible(false)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter=' duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave=' duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Dialog.Overlay className='fixed inset-0 bg-black/60 dark:bg-black/70' />
                  </Transition.Child>
                  <div className='fixed inset-0'>
                    <div className='flex justify-start min-h-full '>
                      <Transition.Child
                        as={Fragment}
                        enter='transition duration-100 transform'
                        enterFrom='opacity-0 -translate-x-56'
                        enterTo='opacity-100 translate-x-0'
                        leave='transition duration-150 transform'
                        leaveFrom='opacity-100 translate-x-0'
                        leaveTo='opacity-0 -translate-x-56'
                      >
                        <Dialog.Panel className='w-full max-w-md transform overflow-hidden transition-all '>
                          <Filter closeFilter={setFilterVisible} />
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            ) : (
              <Filter closeFilter={setFilterVisible} />
            )}
          </div>
          <div className='col-span-12 lg:col-span-8'>
            <SortPanel
              handleIsGrid={setIsGrid}
              isGrid={isGrid}
              openFilter={setFilterVisible}
            />
            <CarList
              CarList={DEMO_CAR_LIST}
              isLoading={isLoading}
              isGrid={isGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListPage;
