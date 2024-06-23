import React from 'react';
import SectionHero from '@/components/SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import BackgroundSection from '@/components/BackgroundSection';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe from '@/components/SectionSubscribe';
import SectionWhyChooseUs from '@/components/SectionWhyChooseUs';
import SectionVideos from '@/components/SectionVideos';
import SectionClientSay from '@/components/SectionClientSay';

function PageHome() {
  return (
    <div className='nc-PageHome relative overflow-hidden'>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className='container pt-12 xl:pt-14 pb-24 lg:pb-28'>
        <SectionHero />
      </div>

      <div className='container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28'>
        {/* <div className='relative py-16'>
          <BackgroundSection /> */}
        <SectionHowItWork />
        {/* </div> */}

        {/* <SectionVideos /> */}

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionWhyChooseUs />
        </div>

        {/* <div className='relative py-16'>
          <BackgroundSection /> */}
        <SectionClientSay />
        {/* </div> */}

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionSubscribe />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
