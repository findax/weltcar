import { Metadata } from 'next';
import BgGlassmorphism from '@/components/BgGlassmorphism';
import SectionHero from './(components)/SectionHero';
import SectionStatistic from './(components)/SectionStatistic';
import BackgroundSection from '@/components/BackgroundSection';
import SectionOurTeam from './(components)/SectionOurTeam';
import SectionClientSay from '@/components/SectionClientSay';
import SectionSubscribe from '@/components/SectionSubscribe';

export const metadata: Metadata = {
  title: 'About Us | Elite Car Sales & Global Delivery Services | WeltCar',
  description:
    'Learn more about our commitment to providing the finest luxury cars with exceptional global delivery services. Discover our mission, values, and why we are the preferred choice for elite vehicles worldwide.',
};

const PageAbout = () => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className='container my-12 xl:my-20 space-y-16 xl:space-y-28'>
        <SectionHero />
        <SectionStatistic />

        <div className='relative py-16'>
          <BackgroundSection />
          <SectionOurTeam />
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
};

export default PageAbout;
