import Image from 'next/image';
import carImg from '@/images/car-2.webp';
import SBS1img from '@/images/icons/message.webp';
import SBS2img from '@/images/icons/bell.webp';
import Badge from '@/shared/Badge';
import SubscribeForm from '@/components/SubscribeForm';

const Subscribe = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`nc-Subscribe relative flex flex-col lg:flex-row items-start lg:items-center gap-16 ${className}`}
      data-nc-id='Subscribe'
    >
      <div className='flex-shrink-0 lg:w-1/2 lg:pr-16'>
        <h2 className='mb-10 font-semibold text-4xl'>Join Our Newsletter</h2>
        {/* <span className='block mt-5 text-neutral-500 dark:text-neutral-400'>
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span> */}
        <SubscribeForm />
        <ul className='space-y-8 mt-10'>
          <li className=''>
            <h3 className='flex items-center space-x-4 font-medium text-neutral-700 dark:text-neutral-300'>
              <Badge name='01' className='mr-3' /> Stay Updated with WeltCar's
              Latest News and Offers
            </h3>
            <p className='mt-4 text-neutral-500 dark:text-neutral-400'>
              Sign up for our newsletter to receive exclusive insights and
              updates on the latest luxury cars and special promotions. Don’t
              miss out on the chance to be the first to know about our exciting
              offers and news.
            </p>
          </li>
          <li className=''>
            <h3 className='flex items-center space-x-4 font-medium text-neutral-700 dark:text-neutral-300'>
              <Badge color='red' name='02' className='mr-3' /> Subscribe Now and
              Never Miss a Deal
            </h3>
            <p className='mt-4 text-neutral-500 dark:text-neutral-400'>
              Join our newsletter to stay informed and connected with the world
              of luxury automobiles. Be a part of our elite community and enjoy
              the benefits of being in the know.
            </p>
          </li>
        </ul>
      </div>
      <div className='flex-grow'>
        <div className='grid grid-cols-2'>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='shaking hands'
              className='opacity-[0.82] dark:opacity-100'
              src={SBS1img}
            />
          </div>
          <div className='relative w-8/12 sm:w-7/12 m-auto after:content after:absolute after:inset-0 after:rounded-full after:shadow-2xl after:shadow-[#fed800]'>
            <Image
              alt='best prices'
              className='opacity-[0.82] dark:opacity-100'
              src={SBS2img}
            />
          </div>
        </div>
        <Image className='mt-12' alt='car image' src={carImg} />
      </div>
    </div>
  );
};

export default Subscribe;
