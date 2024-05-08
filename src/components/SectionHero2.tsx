import heroRightImage from '@/images/Main-Banner-About.webp';
import premiumLogo from '@/images/premium-quality.png';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from '@/shared/ButtonPrimary';

export default function SectionHeroArchivePage() {
  return (
    <div
      className='nc-SectionHeroArchivePage flex flex-col relative'
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col space-y-14 lg:space-y-16 text-center lg:text-left'>
        <div className='flex items-center justify-between'>
          <div className='w-max space-y-5 lg:space-y-7'>
            <h2 className='font-semibold md:font-bold text-4xl md:text-5xl xl:text-7xl leading-[110%] xl:leading-[120%]'>
              Hamburg, Germany
            </h2>
            <div className='hidden lg:flex text-base md:text-lg text-neutral-500 dark:text-neutral-400'>
              <i className='text-2xl las la-map-marked'></i>
              <span className='ml-2.5'>Hamburg </span>
              <span className='mx-5'></span>
              <i className='text-2xl las la-car'></i>
              <span className='ml-2.5'>112 cars</span>
            </div>
            <div className='text-base md:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-2xl'>
              Accompanying us, you have a trip full of experiences. With
              Chisfis, booking accommodation, resort villas, hotels
            </div>
            <Link href='/catalog' className='inline-block'>
              <ButtonPrimary sizeClass='px-5 py-4 sm:px-7'>
                Start your search
              </ButtonPrimary>
            </Link>
          </div>
          <div className='hidden lg:block flex-grow max-w-sm px-16 mx-auto opacity-90'>
            <Image src={premiumLogo} alt='premium logo' priority />
          </div>
        </div>
        <Image
          src={heroRightImage}
          alt='hero'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
        />
      </div>
    </div>
  );
}
