import heroRightImage from '@/images/hero-right-car.png';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from '@/shared/ButtonPrimary';

export default function SectionHeroArchivePage() {
  return (
    <div
      className='nc-SectionHeroArchivePage flex flex-col relative'
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col lg:flex-row lg:items-start'>
        <div className='flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 xl:pt-8 xl:pr-14 lg:mr-10 xl:mr-0'>
          <h2 className='font-semibold text-4xl md:text-5xl xl:text-7xl leading-[110%] xl:leading-[120%]'>
            Hamburg, Germany
          </h2>
          <div className='flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400'>
            <i className='text-2xl las la-map-marked'></i>
            <span className='ml-2.5'>Hamburg </span>
            <span className='mx-5'></span>
            <i className='text-2xl las la-car'></i>
            <span className='ml-2.5'>112 cars</span>
          </div>
          <span className='text-base md:text-lg text-neutral-500 dark:text-neutral-400'>
            Accompanying us, you have a trip full of experiences. With Chisfis,
            booking accommodation, resort villas, hotels
          </span>
          <Link href='/catalog'>
            <ButtonPrimary sizeClass='px-5 py-4 sm:px-7'>
              Start your search
            </ButtonPrimary>
          </Link>
        </div>
        <div className='flex-grow'>
          <Image
            className='w-full'
            src={heroRightImage}
            alt='hero'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
          />
        </div>
      </div>
    </div>
  );
}
