import { Metadata } from 'next/types';
import SectionHero from '@/components/SectionHero';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe from '@/components/SectionSubscribe';
import SectionWhyChooseUs from '@/components/SectionWhyChooseUs';
import Image from 'next/image';
import carBackgroundDarkImg from '@/images/car-2.png';
import carBackgroundLightImg from '@/images/car-2-light.png';
import carsBackgroundDarkImg from '@/images/car-dark.png';
import carsBackgroundLightImg from '@/images/car-light.png';
import triangleBackgroundImg from '@/images/bg-figures/triangle-1.png';
import triangleBackgroundImgThird from '@/images/bg-figures/triangle-3.png';
import BackgroundShaadowSection from '@/components/BackgroundShaadowSection';
import ThemedImage from '@/shared/ThemedImage';
import ScrollToSection from '@/components/ScrollToSectionButton';

const metadata: Metadata = {
  title:
    'Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Discover our collection of elite cars with global delivery to all countries, including Germany, Switzerland, Dubai, and China. Experience luxury and performance with our exclusive vehicle range.',
};

const TARGET_SECTION_ID = 'target-how-it-work';

type Props = {
  params: { locale: string };
};

export default async function PageHome({ params }: Props) {
  const locale = params.locale;

  return (
    <div className='nc-PageHome relative overflow-hidden'>
      {/* GLASSMOPHIN */}
      {/* <BgGlassmorphism /> */}
      <Image
        src={triangleBackgroundImg}
        alt='triangle background'
        className='absolute top-[11%] -left-[5px] -z-10'
      />
      {/* <Image
        src={triangleBackgroundImgTwo}
        alt='triangle background'
        className='hidden md:block absolute top-[28%] -right-[5px] -z-10'
      /> */}
      <Image
        src={triangleBackgroundImgThird}
        alt='triangle background'
        className='absolute rotate-3 bottom-[3%] -left-[8px] sm:-bottom-[7%] lg:-left-[22px] -z-10'
      />
      <BackgroundShaadowSection className='bg-[#DFE172] opacity-[0.30] -left-[350px] top-[4%]' />
      <BackgroundShaadowSection className='hidden lg:block dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -right-[315px] top-[14%]' />
      <BackgroundShaadowSection className='dark:bg-[#123D4A] bg-[#00668451] dark:opacity-[10] -left-[200px] bottom-[34%] lg:left-[25px] lg:bottom-[40%]' />
      <BackgroundShaadowSection className='-bottom-[2%] -right-[80%] bg-[#DFE172] opacity-[0.30] lg:-right-[467px] lg:-bottom-[9%]' />
      {/* SECTION HERO */}
      <div className='relative container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <SectionHero locale={locale} />
      </div>
      <ScrollToSection targetId={TARGET_SECTION_ID} />
      <div
        id={TARGET_SECTION_ID}
        className='container relative space-y-24 mb-0 sm:mb-24 lg:space-y-28 lg:mb-28 mt-40'
      >
        <div className='relative py-16'>
          <SectionHowItWork />
        </div>

        {/* <SectionVideos /> */}

        <div className='relative flex pb-20 lg:py-20'>
          <SectionWhyChooseUs locale={locale} />
          <div className='lg:max-w-[70%] xl:max-w-full absolute top-[80%] md:top-[65%] lg:top-20 xl:-top-10 -right-24'>
            {/* <Image
              alt='car image'
              src={isDarkMode ? carBackgroundDarkImg : carBackgroundLightImg}
            /> */}
            <ThemedImage
              alt='car image'
              lightSrc={carBackgroundLightImg}
              darkSrc={carBackgroundDarkImg}
            />
          </div>
        </div>

        {/* <div className='relative pt-64 sm:pt-96 lg:py-16'>
          <SectionClientSay />
        </div> */}

        <div className='relative pt-64 sm:pt-96 lg:pt-0 xl:pt-16 py-16'>
          <SectionSubscribe />
        </div>
      </div>
      {/* <div className='flex-grow absolute top-[1530px] -right-0'>
        <Image
          alt='car image'
          src={carImg}
        />
      </div> */}
      <div className='hidden relative sm:bottom-0 sm:h-full -bottom-[30px] h-72 justify-center w-full'>
        {/* <Image
          src={isDarkMode ? carsBackgroundDarkImg : carsBackgroundLightImg}
          alt='cars image'
          className='w-full h-full object-cover'
        /> */}

        <ThemedImage
          alt='cars image'
          lightSrc={carsBackgroundLightImg}
          darkSrc={carsBackgroundDarkImg}
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
}
