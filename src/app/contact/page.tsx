import { Metadata } from 'next';
import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import BackgroundSection from '@/components/BackgroundSection';

export const metadata: Metadata = {
  title: 'WeltCar - Contact us',
};

const PageContact = () => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className='container my-12 xl:my-20 space-y-16 xl:space-y-28'>
        <ContactHero />

        <div className='relative py-16 mb-24 lg:md-32'>
          <BackgroundSection />
          <SectionSubscribe />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
