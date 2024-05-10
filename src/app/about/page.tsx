import { FC } from 'react';
import SectionFounder from './(components)/SectionFounder';
import SectionStatistic from './(components)/SectionStatistic';
import SectionHero from './(components)/SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import BackgroundSection from '@/components/BackgroundSection';
import SectionClientSay from '@/components/SectionClientSay';
import SectionSubscribe from '@/components/SectionSubscribe';

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className='container py-16 xl:py-28 space-y-16 xl:space-y-28'>
        <SectionHero />

        <SectionStatistic />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionFounder />
        </div>

        <SectionClientSay />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionSubscribe />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
