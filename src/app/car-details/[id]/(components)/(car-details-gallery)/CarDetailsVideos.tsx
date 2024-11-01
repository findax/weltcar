'use client';

import { Fragment, useEffect, useRef } from 'react';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CarDetailsSliderWrapper from './components/CarDetailsSliderWrapper';
import ShareSaveBtns from '@/components/ShareSaveBtns';
import { useLastViewedPhoto } from './utils/useLastViewedPhoto';
import { Dialog, Transition } from '@headlessui/react';
import { ICarVideos } from '@/types/cardetails';

import './styles/index.css';
import { useLastViewedVideo } from './utils/useLastViewedVideo';
import { CustomVideoPlayer } from '@/components/CustomVideoPlayer';

export const getNewParam = ({
  paramName = 'videoId',
  value,
}: {
  paramName?: string;
  value: string | number;
}) => {
  let params = new URLSearchParams(document.location.search);
  params.set(paramName, String(value));
  return params.toString();
};

const CarDetailsVideos = ({ videos }: { videos: ICarVideos[] | null }) => {
  const searchParams = useSearchParams();
  const thisPathname = usePathname();
  const router = useRouter();
  const isShowModal = searchParams?.get('modal') === 'CAR_VIDEO_TOUR';
  // const [lastViewedVideo, setLastViewedVideo] = useLastViewedVideo();
  // const videoId = searchParams?.get('videoId');
  // const lastViewedVideoRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   //This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
  //   if (lastViewedVideo && !videoId) {
  //     lastViewedVideoRef.current?.scrollIntoView({ block: 'center' });
  //     setLastViewedVideo(null);
  //   }
  // }, [videoId, lastViewedVideo, setLastViewedVideo]);

  const handleClose = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete('modal');
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const renderContent = () => {
    return (
      <>
        {videos?.map(( video, index ) => (
          index === 0 && <CustomVideoPlayer url={video.url} key={video.id}/>
        ))}
      </>
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
          <div className='fixed inset-0 bg-white dark:bg-neutral-900 opacity-60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex h-full items-center justify-center'>
            <Dialog.Panel>
              {renderContent()}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetailsVideos;
