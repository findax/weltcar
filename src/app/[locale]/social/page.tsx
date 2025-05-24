import Image from 'next/image';
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png';
import { getTranslations } from 'next-intl/server';
import sectionHeroCar from '@/images/car-1.png';
import SocialsList1 from '@/shared/SocialsList1';
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';

export default async function SocialPage() {
  const t = await getTranslations('social');

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      <Image
        src={triangleBackgroundImg}
        alt='triangle background'
        className='absolute top-[11%] -left-[5px] -z-10'
      />
      <Image
        src={triangleBackgroundImgThird}
        alt='triangle background'
        className='absolute rotate-3 bottom-[3%] -left-[8px] sm:-bottom-[7%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection className='bg-[#DFE172] opacity-[0.30] -left-[350px] top-[4%]' />
      <BackgroundShaadowSection className='hidden lg:block dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -right-[315px] top-[14%]' />

      <div className='relative container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <div className='flex flex-col space-y-10 lg:space-y-12 text-left'>
          <h1 className='text-neutral-1050 font-bold text-4xl lg:text-6xl xl:text-[83px] xl:leading-[120%] xl:tracking-wide dark:text-white'>
            {t('title')}{' '}
            <span className='text-primary-600 dark:text-primary-950'>
              WeltCar
            </span>
          </h1>
          <div className='flex justify-between max-lg:flex-col gap-6'>
            <div className='relative flex flex-col gap-10'>
              <div className='lg:w-[423px] xl:w-[495px] xl:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
                {t('description')}
              </div>
              <div>
                <h2 className='font-bold text-neutral-1050 text-lg md:text-xl xl:text-2xl dark:text-white mb-4'>
                  {t('links.title')}
                </h2>

                <SocialsList1 className='flex gap-2 md:space-x-0 flex-col md:space-y-2.5 items-start' />
              </div>
            </div>

            <div className='relative max-sm:left-[20%] max-lg:left-[10%] max-lg:mt-[-120px]'>
              <Image
                src={sectionHeroCar}
                alt='premium logo background car'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
