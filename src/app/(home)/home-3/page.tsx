import React from 'react';
import SectionSubscribe2 from '@/components/SectionSubscribe2';
import BackgroundSection from '@/components/BackgroundSection';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox';
import SectionHero3 from '@/app/(server-components)/SectionHero3';

function PageHome3() {
  return (
    <main className='nc-PageHome3 relative overflow-hidden'>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className='container px-1 sm:px-4 mb-24 '>
        <SectionHero3 className='' />
      </div>

      <div className='container relative space-y-24 mb-24 '>
        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className='relative py-16'>
          <BackgroundSection />
          <SectionGridAuthorBox boxCard='box2' />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;
