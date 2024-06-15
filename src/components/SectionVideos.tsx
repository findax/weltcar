'use client';

import Heading from '@/shared/Heading';
import NcPlayIcon from '@/shared/NcPlayIcon';
import NcPlayIcon2 from '@/shared/NcPlayIcon2';
import Image from 'next/image';
import React, { FC, useState } from 'react';

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: 'Ao7e4iisKMs',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: 'a5V6gdu5ih8',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: 'MuB7HHeuNbc',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = '',
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className='col-span-2 row-span-2 lg:col-span-2 group aspect-w-16 aspect-h-9 bg-neutral-800 rounded-3xl sm:rounded-[30px] overflow-hidden border-4 border-white dark:border-black/50 sm:border-[10px] will-change-transform'
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className='cursor-pointer absolute inset-0 flex items-center justify-center z-10'
            >
              <NcPlayIcon />
            </div>

            <Image
              fill
              className='object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300 '
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              sizes='(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw'
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className='row-span-1 col-span-1 group relative aspect-h-16 aspect-w-16 rounded-3xl sm:rounded-[30px] cursor-pointer overflow-hidden sm:aspect-h-12 lg:aspect-h-9 bg-neutral-800 border-4 border-white dark:border-black/50 sm:border-[10px]'
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className='object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300 '
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes='(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw'
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos pb-8 xl:pb-14 ${className}`}>
      <Heading
        desc='Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome.'
      >
        The Videos
      </Heading>

      <div className='relative grid grid-cols-2 grid-rows-2 lg:grid-cols-3 gap-4'>
        <div className='absolute -top-6 -bottom-6 -right-6 xl:-top-14 xl:-bottom-14 xl:-right-14 w-2/3 rounded-3xl bg-primary-100/50 z-0 sm:rounded-[50px] xl:w-1/2 dark:bg-neutral-800/40'></div>
        {renderMainVideo()}
        {videos.map(renderSubVideo)}
      </div>
    </div>
  );
};

export default SectionVideos;
