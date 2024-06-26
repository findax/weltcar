import Heading from '@/shared/Heading';
import rightImg from '@/images/luxury-vehicle-2.webp';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';

const SectionHero = () => {
  return (
    <div className='nc-SectionHero relative'>
      <div className='flex items-center flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-6 2xl:space-x-0 justify-between text-center lg:text-left'>
        <div className='w-full lg:w-[55%]'>
          <Heading
            className='-mb-2'
            fontClass='!font-bold xl:text-5xl'
            desc='At WeltCar, we are committed to delivering the ultimate luxury
          automotive experience. Our mission is to provide discerning clients
          with a curated selection of VIP vehicles, exceptional customer
          service, and exclusive benefits. With years of expertise in the
          high-end car market, we ensure that each interaction is tailored to
          meet your specific needs and desires. Discover a world where luxury
          meets excellence with WeltCar.'
          >
            About WeltCar
          </Heading>
          {/* {!!btnText && <ButtonPrimary>{btnText}</ButtonPrimary>} */}
        </div>

        <div className='w-full lg:w-[45%] lg:pt-6'>
          <Image
            src={rightImg}
            alt='Luxury Vehicles'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
