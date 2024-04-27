import { useState } from 'react';
import Modal from '@/shared/Modal';
import ButtonPrimary from '@/shared/ButtonPrimary';

export default function PriceSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className='h-full flex justify-center items-center'>
          some content
        </div>
      </Modal>
      <div className='block flex-grow mt-14 lg:mt-0'>
        <div className='hidden lg:block sticky top-28'>
          <div className='detailsSectionSidebar__wrap shadow-xl'>
            <div className='flex justify-between'>
              <span className='text-3xl font-semibold'>190,000€</span>
            </div>

            <ButtonPrimary onClick={handleClick}>Reserve</ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
}
