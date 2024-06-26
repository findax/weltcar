import { Metadata } from 'next';
import ContactHero from './(components)/ContactHero';
import SectionSubscribe from '@/components/SectionSubscribe';
import BackgroundSection from '@/components/BackgroundSection';

export const metadata: Metadata = {
  title: 'Contact Us | Elite Car Sales & Global Delivery Inquiries | WeltCar',
  description:
    'Get in touch with us for inquiries about our luxury cars and global delivery services. Contact our team for assistance with purchasing elite vehicles and delivery to countries like Germany, Switzerland, Dubai, and China.',
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
