import { Suspense } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';
import { ICarGallery, ICarVideos } from '@/types/cardetails';
import { GalleryOption } from '@/types/gallery';
import CarDetailsVideos from '@/app/[locale]/car-details/[id]/(components)/(car-details-gallery)/CarDetailsVideos';
import { GalleryVideoPlayer } from '@/components/GalleryVideoPlayer';
import CarDetailsGallery from '@/app/[locale]/car-details/[id]/(components)/(car-details-gallery)/CarDetailsGallery';


interface IProps {
  images: ICarGallery[];
  videos: ICarVideos[];
}

export default function GalleryMedia({ images, videos }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hasVideo = videos.length > 0;
  const imageCount = images.length;

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
        <GalleryVideoPlayer url={videos[0]?.url} onOpen={openVideoModal} />
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
          onClick={hasVideo ? undefined : openImageModal}
        >
          {renderMainMedia(option)}
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity"></div>
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
          <GalleryVideoPlayer url={videos[0]?.url} onOpen={openVideoModal} />
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

  return (
    <>
      <Suspense>
        <CarDetailsVideos videos={videos} />
      </Suspense>

      <Suspense>
        <CarDetailsGallery images={images} />
      </Suspense>

      <div className="rounded-3xl">
        {renderMainContent()}
      </div>
    </>
  );
}
