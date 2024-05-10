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
      <div className='relative mb-24 lg:mb-32'>
        <Heading
          isCenter
          className='my-16 sm:my-20'
          fontClass='font-bold xl:text-5xl'
        >
          Contact
        </Heading>
        {/* <h2 className='my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Contact
        </h2> */}
        <div className='container max-w-7xl mx-auto'>
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
        </div>
        <Image
          className='hidden sm:block absolute inset-0 top-1/4 object-contain w-10/12 max-w-7xl m-auto opacity-[0.08] -z-10'
          src={bgImg}
          alt='premium logo'
          priority
        />
      </div>

      {/* OTHER SECTIONS */}
      <div className='container'>
        <div className='relative py-16 mb-24 lg:md-32'>
          <BackgroundSection />
          <SectionSubscribe />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
