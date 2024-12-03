import Image from 'next/image';
import SubscribeForm from '@/components/SubscribeForm';
import { ButtonPrimary } from '@/shared/Buttons';
import coverImg from '@/images/icons/cover.svg'

const Subscribe = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`nc-Subscribe flex flex-col gap-12 xl:gap-0 lg:flex-row justify-between  ${className}`}
      data-nc-id='Subscribe'
    >
      <div className='w-full lg:w-[506px]'>
        <h2 className='mb-10 lg:mb-20 font-bold text-neutral-1050 dark:text-white text-3xl md:text-4xl xl:text-5xl'>Join Our Newsletter</h2>
        <SubscribeForm />
        <ButtonPrimary className='mt-5 sm:mt-8 w-full sm:w-fit' href='/catalog'>
          Send email
        </ButtonPrimary>
      </div>
      <div className='w-full lg:w-[581px]'>
        <ul className='space-y-8'>
          <li className=''>
            <h3 className='flex items-center space-x-4 text-lg lg:text-xl font-bold text-neutral-1050 dark:text-white'>
              <Image src={coverImg} alt='cover image' className='mr-3'/> Stay Updated with WeltCar's
              Latest News and Offers
            </h3>
            <p className='mt-4 text-base lg:text-lg text-neutral-500 dark:text-neutral-400'>
              Sign up for our newsletter to receive exclusive insights and
              updates on the latest luxury cars and special promotions. Don’t
              miss out on the chance to be the first to know about our exciting
              offers and news.
            </p>
          </li>
          <li className=''>
            <h3 className='flex items-center space-x-4 text-lg lg:text-xl font-bold text-neutral-1050 dark:text-white'>
              <Image src={coverImg} alt='cover image' className='mr-3'/> Subscribe Now and
              Never Miss a Deal
            </h3>
            <p className='mt-4 text-base lg:text-lg text-neutral-500 dark:text-neutral-400'>
              Join our newsletter to stay informed and connected with the world
              of luxury automobiles. Be a part of our elite community and enjoy
              the benefits of being in the know.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subscribe;
