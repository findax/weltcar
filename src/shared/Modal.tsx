'use client';

import { ReactNode, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ButtonClose from '@/shared/ButtonClose';

export default function Modal({
  title = '',
  maxWidth = 'max-w-lg',
  isModalOpen = false,
  setIsModalOpen,
  children,
}: {
  title?: string;
  maxWidth?: string;
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
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/80' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`${maxWidth} pb-2 w-full h-full min-h-96 transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl`}
              >
                {title && (
                  <Dialog.Title
                    as='div'
                    className='relative flex-shrink-0 text-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-800'
                  >
                    <h3 className='text-lg font-medium leading-6'>{title}</h3>
                  </Dialog.Title>
                )}
                <ButtonClose
                  className='absolute right-3 top-3'
                  onClick={closeModal}
                />
                <div className='p-6 md:p-10 w-full h-full flex justify-center items-center text-neutral-700 dark:text-neutral-300'>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
