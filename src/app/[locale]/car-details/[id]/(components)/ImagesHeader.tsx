import { Suspense } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';
import CarDetailsGallery from './(car-details-gallery)/CarDetailsGallery';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/outline';
import { ICarGallery, ICarVideos } from '@/types/cardetails';
import CarDetailsVideos from './(car-details-gallery)/CarDetailsVideos';
import BtnDetails from './BtnDetails';
import { useTranslations } from 'next-intl';

interface IProps {
  images: ICarGallery[];
  videos?: ICarVideos[] | null;
}

export default function ImagesHeader({ 
  images, 
  videos
}: IProps) {
  const thisPathname = usePathname();
  const router = useRouter();
  const translate = useTranslations();

  const handleOpenModalImageGallery = () => {
    images.length > 1
      ? router.push(`${thisPathname}/?modal=CAR_PHOTO_TOUR` as Route)
      : router.push(`${thisPathname}/?modal=CAR_PHOTO_TOUR&photoId=0` as Route);
  };

  const handleOpenModalVideoGallery = () => {
    if(videos){
      router.push(`${thisPathname}/?modal=CAR_VIDEO_TOUR` as Route);
    }
    // FUTURE 
    // if(videos){
    //   videos.length > 1
    //     ? router.push(`${thisPathname}/?modal=CAR_VIDEO_TOUR` as Route)
    //     : router.push(`${thisPathname}/?modal=CAR_VIDEO_TOUR&videoId=0` as Route);
    // }
  };
  
  return (
    <>
      <Suspense>
        <CarDetailsGallery images={images} />
      </Suspense>

      <Suspense>
        <CarDetailsVideos videos={videos ? videos : null} />
      </Suspense>

      <div className='mt-4 rounded-3xl'>
        {images.length < 3 ? (
          <div className='relative w-full h-fit'>
            <div
              className='relative bg-img-placeholder w-full max-w-6xl m-auto pb-[44%] rounded-3xl overflow-hidden cursor-pointer'
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                src={images[0].url}
                alt='car image'
                className='absolute inset-0 object-cover transition-opacity opacity-0 duration-[1s]'
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                priority
              />
              <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
              <div className='absolute flex gap-2 left-3 bottom-3 '>
                <BtnDetails 
                  className='flex items-center md:justify-center'
                  title={translate('carDetails.showP.label')}
                  ico={<Squares2X2Icon className='h-4 w-4 md:h-5 md:w-5' />}
                  handleOpenModal={handleOpenModalImageGallery}
                />

                { 
                  videos && (
                    <BtnDetails 
                      className='flex items-center justify-center'
                      title={translate('carDetails.whatchV.label')}
                      ico={<PlayIcon className='h-4 w-4 md:h-5 md:w-5' />}
                      handleOpenModal={handleOpenModalVideoGallery}
                    />
                  )
                }
              </div>
            </div>
          </div>
        ) : ( 
          <div className='relative grid grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-3 gap-2 sm:gap-4'>
            <div
              className='relative bg-img-placeholder row-span-2 col-span-2 rounded-3xl overflow-hidden cursor-pointer'
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                src={images[0].url}
                alt='car image'
                className='object-cover rounded-3xl transition-opacity opacity-0 duration-[1s]'
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                priority
              />
              <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
              <div className='absolute left-3 bottom-3 flex gap-2'>
                <BtnDetails 
                  className='hidden md:flex md:items-center md:justify-center left-3 bottom-3'
                  title={translate('carDetails.showP.label')}
                  ico={<Squares2X2Icon className='h-4 w-4 md:h-5 md:w-5' />}
                  handleOpenModal={handleOpenModalImageGallery}
                />

                { 
                  videos && (
                    <BtnDetails 
                      className='flex items-center justify-center left-3 bottom-3 md:left-52 md:bottom-3'
                      title={translate('carDetails.whatchV.label')}
                      ico={<PlayIcon className='h-4 w-4 md:h-5 md:w-5' />}
                      handleOpenModal={handleOpenModalVideoGallery}
                    />
                  )
                }
              </div>
            </div>

            {/*  */}
            {images
              .filter((_, i) => i >= 1 && i < 3)
              .map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl overflow-hidden ${
                    index >= 2 ? 'block' : ''
                  }`}
                >
                  <div className='bg-img-placeholder pb-[56%]'>
                    <Image
                      fill
                      src={item.url}
                      alt='car image'
                      className='object-cover w-full h-full rounded-3xl transition-opacity opacity-0 duration-[1s]'
                      onLoad={(e) =>
                        e.currentTarget.classList.remove('opacity-0')
                      }
                      sizes='400px'
                    />

                    {/* OVERLAY */}
                    <div
                      className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                      onClick={handleOpenModalImageGallery}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
