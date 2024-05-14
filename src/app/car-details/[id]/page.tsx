'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImagesHeader from './(components)/ImagesHeader';
import Documents from './(components)/Documents';
import CarDescriptions from './(components)/CarDescriptions';
import PriceSidebar from './(components)/PriceSidebar';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import Modal from '@/shared/Modal';
import ConfirmForm from './(components)/ConfirmForm';
import { getCarDetails } from '@/api/cars';
import { ICarDetails, ICarGallery } from '@/types/cardetails';
import LoadingSpinner from '@/shared/LoadingSpinner';

type CarDetailsPageProps = {
  params: {
    id: string;
  };
};

const CarDetailsPage = ({ params: { id } }: CarDetailsPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState<ICarDetails | null>(null);
  const [carGallery, setCarGallery] = useState<ICarGallery[]>([]);

  //todo: add notFound()
  useEffect(() => {
    getCarDetails(id)
      .then((res: any) => {
        if (res) {
          setCar(res);
          const modifiedPhotosArray = [...res.photos].map((item, index) => ({
            id: index,
            url: item.original,
          }));

          setCarGallery(modifiedPhotosArray);
        } else {
          // todo: add handle error
        }
        isLoading && setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState('');
  const price = 460000;

  function handleReserve(modalId: string) {
    setModalId(modalId);
    setIsModalOpen(true);
  }

  return isLoading ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <LoadingSpinner className='w-12' />
    </div>
  ) : (
    <div className='CarDetailsPage'>
      <div className='container CarDetailsPage__content'>
        <div className={` nc-CarDetailsPage `}>
          <ImagesHeader images={carGallery} />

          <main className=' relative z-10 my-11 flex flex-col lg:flex-row '>
            <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
              <Documents />
              <CarDescriptions />
            </div>

            <PriceSidebar onClick={handleReserve} data={price} />
          </main>
        </div>
      </div>

      <MobileFooterSticky onClick={handleReserve} data={price} />

      {modalId === 'confirm' && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ConfirmForm />
        </Modal>
      )}
    </div>
  );
};

export default CarDetailsPage;
