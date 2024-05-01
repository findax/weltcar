'use client';

import { Fragment, useEffect, useRef } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CarDetailsSliderWrapper from './components/CarDetailsSliderWrapper';
import ShareSaveBtns from '@/components/ShareSaveBtns';
import type { CarGalleryImage } from '@/data/types';
import { useLastViewedPhoto } from './utils/useLastViewedPhoto';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import './styles/index.css';

export const getNewParam = ({
  paramName = 'photoId',
  value,
}: {
  paramName?: string;
  value: string | number;
}) => {
  let params = new URLSearchParams(document.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

const CarDetailsGallery = ({ images }: { images: CarGalleryImage[] }) => {
  const searchParams = useSearchParams();
  const isShowModal = searchParams?.get('modal') === 'CAR_PHOTO_TOUR';
  const photoId = searchParams?.get('photoId');
  const router = useRouter();
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLDivElement>(null);
  const thisPathname = usePathname();

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const handleClose = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete('modal');
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const renderContent = () => {
    return (
      <div className=' '>
        {photoId && (
          <CarDetailsSliderWrapper
            images={images}
            onClose={() => {
              // @ts-ignore
              setLastViewedPhoto(photoId);
              let params = new URLSearchParams(document.location.search);
              params.delete('photoId');
              router.push(`${thisPathname}/?${params.toString()}` as Route);
            }}
          />
        )}

        <div className='columns-1 gap-4 sm:columns-2 xl:columns-3'>
          {images.map(({ id, url }) => (
            <div
              key={id}
              onClick={() => {
                const newPathname = getNewParam({ value: id });
                router.push(`${thisPathname}/?${newPathname}` as Route);
              }}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              className='after:content relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight focus:outline-none'
            >
              <Image
                alt='car image'
                className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 focus:outline-none'
                style={{
                  transform: 'translate3d(0, 0, 0)',
                }}
                src={url}
                width={720}
                height={480}
                sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px'
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Transition appear show={isShowModal} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-white dark:bg-neutral-900' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='sticky z-10 top-0 p-4 xl:px-10 flex items-center justify-between bg-white dark:bg-neutral-900'>
            <button
              className='focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 hover:dark:bg-neutral-800'
              onClick={handleClose}
            >
              <ArrowLeftIcon className='w-6 h-6' />
            </button>
            {/* <ShareSaveBtns /> */}
          </div>

          <div className='flex min-h-full items-center justify-center sm:p-4 pt-0 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-5'
              enterTo='opacity-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-5'
            >
              <Dialog.Panel className='w-full max-w-screen-2xl mx-auto transform p-4 pt-0 text-left transition-all '>
                {renderContent()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetailsGallery;
