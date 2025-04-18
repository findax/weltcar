import { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';
import playImage  from '@/images/icons/video-play.svg'
import { ICarGallery, ICarVideos } from '@/types/cardetails';
import CarDetailsGallery from '@/app/[locale]/car-details/[id]/(components)/(car-details-gallery)/CarDetailsGallery';
import { GalleryOption } from '@/types/gallery';

interface IProps {
  images: ICarGallery[];
  videos: ICarVideos[];
}

export default function GalleryMedia({ images, videos }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = videos.length > 0;
  const imageCount = images.length;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const openImageModal = () => {
    const modalPath = `${pathname}/?modal=CAR_PHOTO_TOUR${images.length <= 1 ? '&photoId=0' : ''}`;
    router.push(modalPath as Route);
  };

  const openVideoModal = () => {
    if (videos.length > 0) {
      router.push(`${pathname}/?modal=CAR_VIDEO_TOUR` as Route);
    }
  };

  const renderVideoOrImageMedia = (type: string) => {
    if(type === 'video') {
      return (
        // <div>
        //   <video
        //     ref={videoRef}
        //     autoPlay
        //     muted
        //     loop
        //     playsInline
        //     preload="metadata"
        //     className="absolute w-full h-full inset-0 object-cover transition-opacity opacity-0 duration-[1s]"
        //     onLoadedData={(e) => e.currentTarget.classList.remove('opacity-0')}
        //   >
        //     <source src={videos[0].url} type="video/mp4" />
        //   </video>

        //   {!isPlaying && (
        //     <div
        //       className="absolute inset-0 flex items-center justify-center bg-opacity-0 cursor-pointer"
        //       onClick={handlePlay}
        //     >
        //       <button className='focus:outline-none'>
        //         <Image
        //           src={playImage}
        //           alt='player image'
        //           className='h-[52px] w-[52px] md:h-[78px] md:w-[78px] lg:h-[104px] lg:w-[104px]'
        //         />
        //       </button>
        //     </div>
        //   )}
        // </div>
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute w-full h-full inset-0 object-cover transition-opacity opacity-0 duration-[1s]"
              onLoadedData={(e) => e.currentTarget.classList.remove('opacity-0')}
            >
              <source src={videos[0].url} type="video/mp4" />
            </video>

            <div className='absolute w-[70%] bottom-10 left-28'>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                className="w-full h-[2px] appearance-none bg-transparent"
                style={{
                  background: `linear-gradient(to right, #e6e766 ${progress}%, #ffffff ${progress}%)`,
                }}
                onChange={(e) => {
                  const newTime = (Number(e.target.value) / 100) * (videoRef.current?.duration || 0);
                  if (videoRef.current) {
                    videoRef.current.currentTime = newTime;
                  }
                  setProgress(Number(e.target.value));
                }}
              />
            </div>

            {!isPlaying && (
              <div className="absolute bottom-6 left-8 z-10 bg-opacity-0 pointer-events-none">
                <Image
                  src={playImage}
                  alt="player image"
                  className="h-[48px] w-[48px]"
                />
              </div>
            )}
          </>
      )
    } else {
      return (
        <Image
          fill
          src={images[0]?.url}
          alt="car image"
          className="absolute inset-0 object-cover transition-opacity opacity-0 duration-[1s]"
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
      )
    }
  }

  const renderMainMedia = (option: string) => {
    switch (option) {
      case GalleryOption.All:
        return (
          renderVideoOrImageMedia('video')
        )
      case GalleryOption.VideoMedium:
        return (
          renderVideoOrImageMedia('video')
        )
      case GalleryOption.NoVideoAll:
        return (
          renderVideoOrImageMedia('image')
        )
      case GalleryOption.NoVideoMedium:
        return (
          renderVideoOrImageMedia('image')
        )
    }
  }

  const renderMainContentOfMedia = (start: number, end: number, option: GalleryOption) => {
    return (
      <div className={`relative w-full h-fit grid xsS:grid-cols-2 md:grid-cols-3 ${hasVideo && imageCount >= 5 ? 'md:grid-rows-3' : 'md:grid-rows-2'} gap-2 sm:gap-4`}>
        <div
          className="relative xsS:row-span-2 md:row-span-2 w-full max-w-6xl pb-[56%] xsS:pb-[44%] xsS:w-auto xsS:col-span-2 rounded-3xl overflow-hidden cursor-pointer"
          onClick={hasVideo ? openVideoModal : openImageModal}
        >
          {renderMainMedia(option)}
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        {images.slice(start, end).map((item, index) => (
          <div key={index} className={` ${hasVideo && imageCount > 2 ? 'xsS:hidden' : ''} ${!hasVideo && imageCount > 2 ? 'xsS:hidden' : ''} xsS:block md:block relative rounded-3xl overflow-hidden`}>
            <div className="pb-[56%]">
              <Image
                fill
                src={item.url}
                alt="car image"
                className="object-cover w-full h-full rounded-3xl transition-opacity opacity-0 duration-[1s]"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                sizes="400px"
              />
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={openImageModal}
              />
            </div>
        </div>))
        }
      </div>
    )
  }

  const renderMainContent = () => {
    if(hasVideo && imageCount >= 5){
      return (
        renderMainContentOfMedia(0, 5, GalleryOption.All)
      );
    }
    if(hasVideo && imageCount < 5 && imageCount >= 2){
      return (
        renderMainContentOfMedia(0, 2, GalleryOption.VideoMedium)
      )
    }
    if(hasVideo && imageCount < 2){
      return (
        <div className="relative w-full max-w-6xl m-auto pb-[44%] rounded-3xl overflow-hidden cursor-pointer">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute w-full h-full inset-0 object-cover transition-opacity opacity-0 duration-[1s]"
            onLoadedData={(e) => e.currentTarget.classList.remove('opacity-0')}
          >
            <source src={videos[0].url} type="video/mp4" />
          </video>
        </div>
      )
    }
    if(!hasVideo && imageCount >= 6){
      return (
        renderMainContentOfMedia(1, 6, GalleryOption.NoVideoAll)
      )
    }
    if(!hasVideo && imageCount > 2 && imageCount < 6){
      return (
        renderMainContentOfMedia(1, 3, GalleryOption.NoVideoMedium)
      )
    }
    if(!hasVideo && imageCount <= 2){
      return (
        <div className="relative w-full max-w-6xl m-auto pb-[44%] rounded-3xl overflow-hidden cursor-pointer">
          <Image
            fill
            src={images[0]?.url}
            alt="car image"
            className="absolute inset-0 object-cover transition-opacity opacity-0 duration-[1s]"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            priority
          />
        </div>
      )
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const duration = video.duration;
      const percentage = (current / duration) * 100;
      setProgress(percentage);
    };
  
    video.addEventListener('timeupdate', handleTimeUpdate);
  
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <>
      <Suspense>
        <CarDetailsGallery images={images} />
      </Suspense>

      <div className="rounded-3xl">
        {renderMainContent()}
      </div>

    </>
  );
}
