import carImg from '@/images/car-3.png';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';

const SectionHero = () => {
  return (
    <div className='nc-SectionHero relative'>
      <div className='relative flex items-center flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-6 2xl:space-x-0 justify-between text-center lg:text-left'>
        <div className='w-max'>
          <h1 className='text-neutral-1050 dark:text-white font-bold md:font-bold text-5xl md:text-5xl xl:text-[80px]'>
            About <span className='text-primary-600'>WeltCar</span>
          </h1>
          <div className='w-[520px]'>
            <div className='mt-10 mb-8 text-lg md:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
              At WeltCar, we are committed to delivering the ultimate luxury automotive experience. Our mission 
              is to provide discerning clients with a curated selection of VIP vehicles, exceptional customer service, and exclusive benefits. With years 
              of expertise in the high-end car market, we ensure that each interaction is tailored to meet your specific needs and desires. Discover a world where luxury meets excellence with WeltCar.
            </div>
            <ButtonPrimary sizeClass='px-5 py-4 sm:px-7' href='/catalog'>
              Start your search
            </ButtonPrimary>
          </div>
          <div className='hidden absolute top-[27%] right-0 lg:block flex-grow'>
            <Image 
              src={carImg}  
              alt='premium logo background' 
              priority 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
