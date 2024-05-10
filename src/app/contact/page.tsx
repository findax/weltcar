import Heading from '@/shared/Heading';
import SocialsList from '@/shared/SocialsList';
import MessageForm from './(components)/MessageForm';
import SectionSubscribe from '@/components/SectionSubscribe';
import BackgroundSection from '@/components/BackgroundSection';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/lamborghini-side.png';

export interface PageContactProps {}

const info = [
  {
    title: '🗺 ADDRESS',
    desc: 'Neuer Weg 11, 11111 Hamburg',
  },
  {
    title: '💌 EMAIL',
    desc: 'nc.example@example.com',
  },
  {
    title: '☎ PHONE',
    desc: '000-123-456-7890',
  },
];

const PageContact = () => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className='container py-16 xl:py-28 space-y-16 xl:space-y-28'>
        {/* <div className='relative mb-24 lg:mb-32'>
        <div className='container max-w-7xl mx-auto'> */}
        <div className='relative'>
          <Heading
            isCenter
            className='mb-16 xl:mb-20'
            fontClass='!font-bold xl:text-5xl'
          >
            Contact
          </Heading>
          <div className='flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 '>
            <div className='max-w-sm space-y-8'>
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                    {item.title}
                  </h3>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                  🌏 SOCIALS
                </h3>
                <SocialsList className='mt-2' />
              </div>
            </div>

            <MessageForm />
          </div>
          {/* </div> */}
          <Image
            className='hidden sm:block absolute inset-0 object-contain w-full max-w-7xl m-auto opacity-[0.08] -z-10'
            src={bgImg}
            alt='premium logo'
            priority
          />
        </div>

        <div className='relative py-16 mb-24 lg:md-32'>
          <BackgroundSection />
          <SectionSubscribe />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
