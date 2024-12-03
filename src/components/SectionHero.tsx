import sectionHeroCar from '@/images/car-1.png';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';

export default function SectionHeroArchivePage() {
  return (
    <div
      className='nc-SectionHeroArchivePage flex flex-col relative'
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col space-y-14 lg:space-y-16 text-left'>
        <div className='flex items-center justify-between'>
          <div className='w-max space-y-5 lg:space-y-7'>
            <h1 className='text-neutral-1050 font-bold text-4xl lg:text-6xl xl:text-[83px] xl:leading-[120%] xl:tracking-wide dark:text-white'>
              Welcome to <span className='text-primary-600 dark:text-primary-950'>WeltCar</span>
            </h1>
            <div className='relative flex justify-between gap-20'>
              <div className='lg:w-[423px] xl:w-[495px]'>
                <h2 className='font-bold text-neutral-1050 text-lg md:text-xl xl:text-2xl dark:text-white'>
                  Your Gateway to Luxury Automotive Excellence
                </h2>
                <div className='mt-5 mb-8 xl:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
                  At WeltCar, we specialize in providing the finest exclusive
                  vehicles, ensuring luxury and sophistication in every drive. With
                  our vast selection of top-tier cars, personalized service, and
                  exclusive offers, we make your dream of owning a premium vehicle a
                  reality. Experience the pinnacle of automotive excellence with
                  WeltCar.
                </div>
                <ButtonPrimary className='xl:text-lg w-full sm:w-fit' sizeClass='px-5 py-4 sm:px-7' href='/catalog'>
                  Start your search
                </ButtonPrimary>
              </div>
            </div>
          </div>

          <div className='absolute -z-10 top-[400px] xsS:top-[290px] sm:top-[255px] -right-[207px] md:top-[220px] md:max-w-full lg:top-24 xl:top-36 lg:right-[-80px] lg:max-w-[80%] xl:max-w-full'>
            <Image 
              src={sectionHeroCar}  
              alt='premium logo background car' 
              priority 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
