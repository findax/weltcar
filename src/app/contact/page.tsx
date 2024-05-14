import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import BackgroundSection from '@/components/BackgroundSection';

const PageContact = () => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className='container py-16 xl:py-28 space-y-16 xl:space-y-28'>
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
