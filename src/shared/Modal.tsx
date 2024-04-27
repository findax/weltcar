'use client';

import { ReactNode, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ButtonClose from '@/shared/ButtonClose';

export default function Modal({
  isModalOpen = false,
  setIsModalOpen,
  children,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: ReactNode;
}) {
  // let [isModalOpen, setisModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-40' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block py-8 h-screen w-full max-w-4xl'>
              <div className='inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full'>
                <div className='relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center'>
                  <h3 className='text-lg font-medium leading-6'>Amenities</h3>
                  <span className='absolute left-3 top-3'>
                    <ButtonClose onClick={closeModal} />
                  </span>
                </div>
                <div className='h-full px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200'>
                  {children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
