import React from 'react';
import SectionHero from '@/app/(server-components)/SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories';
import SectionOurFeatures from '@/components/SectionOurFeatures';
import BackgroundSection from '@/components/BackgroundSection';
import SectionHowItWork from '@/components/SectionHowItWork';
import SectionSubscribe2 from '@/components/SectionSubscribe2';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox';
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
        <SectionOurFeatures />

        <SectionHowItWork />

        <SectionSubscribe2 />

        <div className='relative py-16'>
          <BackgroundSection className='bg-orange-50 dark:bg-black dark:bg-opacity-20 ' />
          <SectionGridAuthorBox />
        </div>

        <SectionGridCategoryBox />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionSliderNewCategories
          heading='Explore by types of stays'
          subHeading='Explore houses based on 10 types of stays'
          categoryCardType='card5'
          itemPerRow={5}
        />

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
