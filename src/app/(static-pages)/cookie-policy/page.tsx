import { Metadata } from 'next';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-8.webp';

export const metadata: Metadata = {
  title: 'Cookie Policy',
};

export default function CookiePolicyPage() {
  return (
    <div className='markdown-styles relative container my-12 xl:my-20'>
      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full max-w-7xl m-auto opacity-[0.09] dark:opacity-[0.12] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
      <div className='max-w-3xl'>
        <h1>Cookie Policy</h1>
        <div className='w-14 border-b border-neutral-300 dark:border-neutral-700 mb-6 lg:mb-8'></div>
        <p className='text-neutral-600 dark:text-neutral-300'>
          We may collect information about your computer, including your IP
          address, operating system and browser type, for system administration
          and in order to create reports. This is statistical data about our
          users’ browsing actions and patterns, and does not identify any
          individual.
        </p>
        <p className='text-neutral-600 dark:text-neutral-300'>
          The only cookies in use on our site are for Google Analytics. Google
          Analytics is a web analytics tool that helps website owners understand
          how visitors engage with their website. Google Analytics customers can
          view a variety of reports about how visitors interact with their
          website so that they can improve it.
        </p>
        <p className='text-neutral-600 dark:text-neutral-300'>
          Like many services, Google Analytics uses first-party cookies to track
          visitor interactions as in our case, where they are used to collect
          information about how visitors use our site. We then use the
          information to compile reports and to help us improve our site.
        </p>
        <p className='text-neutral-600 dark:text-neutral-300'>
          Cookies contain information that is transferred to your computer’s
          hard drive. These cookies are used to store information, such as the
          time that the current visit occurred, whether the visitor has been to
          the site before and what site referred the visitor to the web page.
        </p>
        <p className='text-neutral-600 dark:text-neutral-300'>
          Google Analytics collects information anonymously. It reports website
          trends without identifying individual visitors. You can opt out of
          Google Analytics without affecting how you visit our site, for more
          information on opting out of being tracked by Google Analytics across
          all websites you use, visit this Google page.
        </p>
      </div>
    </div>
  );
}
