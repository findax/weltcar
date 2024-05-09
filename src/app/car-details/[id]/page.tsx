'use client';

import { useState } from 'react';
import ImagesHeader from './(components)/ImagesHeader';
import { DEMO_CAR_IMAGES_GALLERY } from '@/data/carimagesgallery';
import Documents from './(components)/Documents';
import CarDescriptions from './(components)/CarDescriptions';
import PriceSidebar from './(components)/PriceSidebar';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import Modal from '@/shared/Modal';
import Authorization from '@/components/authorization/Authorization';
import ConfirmForm from './(components)/ConfirmForm';

const CarDetailsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState('');

  function handleReserve(modalId: string) {
    setModalId(modalId);
    setIsModalOpen(true);
  }

  return (
    <div className='CarDetailsPage'>
      <div className='container CarDetailsPage__content'>
        <div className={` nc-CarDetailsPage `}>
          <ImagesHeader images={DEMO_CAR_IMAGES_GALLERY} />

          <main className=' relative z-10 my-11 flex flex-col lg:flex-row '>
            <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
              <Documents />
              <CarDescriptions />
            </div>

            <PriceSidebar onClick={handleReserve} />
          </main>
        </div>
      </div>

      <MobileFooterSticky onClick={handleReserve} />

      {modalId === 'authorization' && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <Authorization />
        </Modal>
      )}

      {modalId === 'confirm' && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ConfirmForm />
        </Modal>
      )}
    </div>
  );
};

export default CarDetailsPage;
