'use client';

import { useEffect, useState } from 'react';
import ImagesHeader from './ImagesHeader';
import Documents from './Documents';
import Descriptions from './Descriptions';
import PriceSidebar from './PriceSidebar';
import MobileFooterSticky from './MobileFooterSticky';
import Modal from '@/shared/Modal';
import ConfirmForm from './ConfirmForm';
import { ICarDetails, ICarGallery } from '@/types/cardetails';
import { getUser } from '@/api/user';
import Authorization from '@/components/authorization/Authorization';
import Title from './Title';

export default function CarDetails({
  carData,
}: {
  carData: ICarDetails | undefined;
}) {
  const [carGallery, setCarGallery] = useState<ICarGallery[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState('');

  useEffect(() => {
    if (carData) {
      const modifiedPhotosArray = [...carData.photos].map((item, index) => ({
        id: index,
        url: item.original,
      }));
      setCarGallery(modifiedPhotosArray);
    }
  }, []);

  useEffect(() => {
    if (!!getUser() && modalId === 'authorization') {
      setModalId('confirm');
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  function handleReserve() {
    if (!!getUser()) {
      setModalId('confirm');
    } else {
      setModalId('authorization');
    }
    setIsModalOpen(true);
  }

  return (
    <div className='CarDetailsPage'>
      <div className='container CarDetailsPage__content'>
        <div className={` nc-CarDetailsPage `}>
          {carGallery.length > 0 && <ImagesHeader images={carGallery} />}

          <main className=' relative z-10 my-11 flex flex-col lg:flex-row '>
            <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
              <Title carData={carData} />
              <Documents documents={carData?.documents || []} />
              <Descriptions description={carData?.description || ''} />
            </div>

            <PriceSidebar
              onClick={handleReserve}
              price={carData?.price || 0}
              isSold={carData?.status === 'sold'}
            />
          </main>
        </div>
      </div>

      <MobileFooterSticky
        onClick={handleReserve}
        price={carData?.price || 0}
        isSold={carData?.status === 'sold'}
      />

      {modalId === 'confirm' && (
        <Modal
          maxWidth='max-w-3xl'
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <ConfirmForm
            carId={carData?.id || ''}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}

      {modalId === 'authorization' && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <Authorization setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </div>
  );
}
