import { FC } from 'react';
import SectionSubscribe from '@/components/SectionSubscribe';
import BackgroundSection from '@/components/BackgroundSection';
import SocialsList from '@/shared/SocialsList';
import Label from '@/components/Label';
import { Input, Textarea } from '@/shared/FormInputs';
import { ButtonPrimary } from '@/shared/Buttons';

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

const PageContact: FC<PageContactProps> = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className='mb-24 lg:mb-32'>
        <h2 className='my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Contact
        </h2>
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
            <form
              className='grid grid-cols-1 gap-6 -mt-1'
              action='#'
              method='post'
            >
              <label className='block'>
                <Label>Full name</Label>

                <Input placeholder='Example Doe' type='text' className='mt-1' />
              </label>
              <label className='block'>
                <Label>Email address</Label>

                <Input
                  type='email'
                  placeholder='example@example.com'
                  className='mt-1'
                />
              </label>
              <label className='block'>
                <Label>Message</Label>

                <Textarea className='mt-1' rows={6} />
              </label>
              <div>
                <ButtonPrimary type='submit'>Send Message</ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
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
