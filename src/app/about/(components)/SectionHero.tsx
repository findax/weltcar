import rightImg from '@/images/Main-Banner-About.webp';
import Image from 'next/image';
import ButtonPrimary from '@/shared/ButtonPrimary';

const SectionHero = () => {
  return (
    <div className='nc-SectionHero relative'>
      <div className='flex items-center flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 text-center lg:text-left'>
        <div className='space-y-5 lg:space-y-7'>
          <h2 className='text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100'>
            👋 About Us
          </h2>
          <span className='block text-base xl:text-lg text-neutral-600 dark:text-neutral-400'>
            We’re impartial and independent, and every day we create
            distinctive, world-class programmes and content which inform,
            educate and entertain millions of people in the around the world.
          </span>
          {/* {!!btnText && <ButtonPrimary>{btnText}</ButtonPrimary>} */}
        </div>

        <div className='lg:pt-6'>
          <Image src={rightImg} alt='Luxury Vehicles' />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
