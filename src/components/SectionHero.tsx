import heroRightImage from '@/images/Main-Banner-About.webp';
import premiumLogo from '@/images/premium-quality.png';
import sectionHeroLogo from '@/images/bgSectionHero.png';
import sectionHeroCar from '@/images/car-1.png';
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
            <h1 className='xl:tracking-wide text-neutral-1050 dark:text-white font-bold md:font-bold text-4xl md:text-5xl xl:text-[83px] leading-[110%] xl:leading-[120%]'>
              Welcome to <span className='text-primary-600'>WeltCar</span>
            </h1>
            <div className='relative flex justify-between gap-20'>
              <div className='w-[495px]'>
                <h2 className='font-bold text-neutral-1050 dark:text-white md:font-bold text-xl md:text-2xl xl:text-2xl '>
                  Your Gateway to Luxury Automotive Excellence
                </h2>
                <div className='mt-5 mb-8 text-lg md:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
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
              <div className='hidden lg:block flex-grow mx-auto'>
                <Image 
                  src={sectionHeroLogo}  
                  alt='premium logo background' 
                  priority 
                />
              </div>
              <div className='absolute top-52 right-[-80px]'>
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
    </div>
  );
}
