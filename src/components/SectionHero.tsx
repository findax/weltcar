import heroRightImage from '@/images/Main-Banner-About.webp';
import premiumLogo from '@/images/premium-quality.png';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';

export default function SectionHeroArchivePage() {
  return (
    <div
      className='nc-SectionHeroArchivePage flex flex-col relative'
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col space-y-14 lg:space-y-16 text-center lg:text-left'>
        <div className='flex items-center justify-between'>
          <div className='w-max space-y-5 lg:space-y-7'>
            <h1 className='font-semibold md:font-bold text-4xl md:text-5xl xl:text-6xl leading-[110%] xl:leading-[120%]'>
              Welcome to WeltCar
            </h1>
            <h2 className='font-semibold md:font-bold text-xl md:text-2xl xl:text-3xl leading-[110%] xl:leading-[120%]'>
              Your Gateway to Luxury&nbsp;Automotive&nbsp;Excellence
            </h2>
            {/* <div className='flex justify-center lg:justify-start text-base md:text-lg text-neutral-500 dark:text-neutral-400'>
              <i className='text-2xl las la-map-marked'></i>
              <span className='ml-2.5'>Hamburg </span>
              <span className='mx-5'></span>
              <i className='text-2xl las la-car'></i>
              <span className='ml-2.5'>112 cars</span>
            </div> */}
            <div className='text-base md:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
              At WeltCar, we specialize in providing the finest exclusive
              vehicles, ensuring luxury and sophistication in every drive. With
              our vast selection of top-tier cars, personalized service, and
              exclusive offers, we make your dream of owning a premium vehicle a
              reality. Experience the pinnacle of automotive excellence with
              WeltCar.
            </div>
            <ButtonPrimary sizeClass='px-5 py-4 sm:px-7' href='/catalog'>
              Start your search
            </ButtonPrimary>
          </div>
          <div className='hidden lg:block flex-grow max-w-sm px-16 mx-auto opacity-90'>
            <Image src={premiumLogo} alt='premium logo' priority />
          </div>
        </div>
        <Image
          src={heroRightImage}
          alt='hero'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
          priority
        />
      </div>
    </div>
  );
}
