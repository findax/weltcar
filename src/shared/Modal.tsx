'use client';

import { ReactNode, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ButtonClose } from '@/shared/Buttons';

interface IProps {
  title?: string;
  maxWidth?: string;
  isModalOpen: boolean;
  handleChange?: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: ReactNode;
}

export default function Modal({
  title = '',
  maxWidth = 'max-w-lg',
  isModalOpen = false,
  setIsModalOpen,
  handleChange = () => {},
  children,
}:IProps) {
  const closeModal = () => {
    setIsModalOpen(false);
    handleChange();
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
                className={`${maxWidth} w-full transition-all transform overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100`}
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
                <div className='px-6 py-10 sm:p-12 w-full h-full flex justify-center items-center text-neutral-700 dark:text-neutral-300'>
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
