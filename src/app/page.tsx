import React from 'react';
import SectionHero from '@/app/(server-components)/SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import BackgroundSection from '@/components/BackgroundSection';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe from '@/components/SectionSubscribe';
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor';
import SectionVideos from '@/components/SectionVideos';
import SectionClientSay from '@/components/SectionClientSay';

function PageHome() {
  return (
    <main className='nc-PageHome relative overflow-hidden'>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className='container pt-10 pb-24 lg:pt-16 lg:pb-28'>
        <SectionHero />
      </div>

      <div className='container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28'>
        <SectionHowItWork />

        <SectionSubscribe />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionVideos />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionClientSay />
        </div>
      </div>
    </main>
  );
}

export default PageHome;
