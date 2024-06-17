import { Metadata } from 'next';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-9.webp';

export const metadata: Metadata = {
  title: 'Legal Notice',
};

export default function CookiePolicyPage() {
  return (
    <div className='markdown-styles relative container my-12 xl:my-20'>
      <div className='max-w-3xl'>
        <h1>Legal Notice</h1>
        <div className='w-14 border-b border-neutral-300 dark:border-neutral-700 mb-6 lg:mb-8'></div>
        <p className='space-y-6 text-neutral-600 dark:text-neutral-300'>
          FinDax GmbH <br />
          Theodor-Fontane-Straße 2 <br />
          22848 Norderstedt <br /> <br />
          IBAN: DE39 4401 0046 0478 7494 69 <br />
          BIC: PBNKDEFF <br />
          Tax Number: 44/780/03655 <br /> <br />
          VAT ID No. DE300567500 <br />
          HRB 126671 <br /> <br />
          Email: <a href='mailto:info@findax.eu'>info@findax.eu</a> <br />
          Website: <a href='https://www.weltcar.de'>www.weltcar.de</a>
        </p>

        <h2 className='font-semibold'>The Website</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            The contents of this website have been carefully checked and created
            to the best of our knowledge. However, no claim is made for the
            completeness, topicality, quality, and accuracy of the information
            provided here. No responsibility can be taken for damages caused by
            reliance on the contents of this website or their use.
          </p>

          <p>
            <span className='font-semibold text-black dark:text-white'>
              Disclaimer:
            </span>{' '}
            This website is part of the WWW and therefore linked to external,
            ever-changing websites. Despite careful content control, we assume
            no liability for the content of external links. The operators of the
            linked pages are solely responsible for their content.
          </p>
          <p>
            Terms used may be registered trademarks of their respective
            manufacturers. Continuous labeling on the pages is waived. The terms
            are used solely for user information.
          </p>

          <p>
            If you suspect that any of your protective rights are being violated
            from this website, please notify us immediately by electronic mail
            so that corrective action can be taken quickly.
          </p>
        </div>
      </div>
      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full max-w-7xl m-auto opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
}
