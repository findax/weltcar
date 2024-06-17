import Heading from '@/shared/Heading';
import SocialsList from '@/shared/SocialsList';
import FeedbackForm from './FeedbackForm';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-2.webp';

export default function ContactHero() {
  return (
    <div className='relative'>
      <Heading
        className='mb-10 xl:mb-14'
        fontClass='!font-bold xl:text-5xl'
        desc='Whether you have questions about our vehicles, need assistance with
        your purchase, or want to learn more about our services, we are here
        to help. Reach out to us through any of the following methods:'
      >
        Contact Us
      </Heading>
      <div className='flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 '>
        <ul className='space-y-5 sm:space-y-8'>
          <li>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              📍 ADDRESS
            </h3>
            <a
              className='inline-block mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='https://www.google.com/maps?q=FinDax+GmbH,+Theodor-Fontane-Stra%C3%9Fe+2,+22848+Norderstedt,+Germany&ftid=0x47b229e490544979:0x29213d5a4a4d551b&entry=gps&lucs=,94224825,94227247,94227248,94222042,47071704,47069508,94214172,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTE5LjEuNjYwNTAYACCenQoqbCw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw5NDIyMjA0Miw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxNDE3Miw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUU%3D&g_st=com.google.maps.preview.copy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Theodor-Fontane-Straße 2, 22848 Norderstedt
            </a>
          </li>
          <li>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              ✉️ EMAIL
            </h3>
            <a
              className='inline-block mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='mailto:info@findax.eu'
            >
              info@findax.eu
            </a>
          </li>
          <li>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              📞 PHONE
            </h3>
            <a
              className='inline-block mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='tel:+4915902465256'
            >
              +49 1590 2465256
            </a>
          </li>
          <li>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              🌏 SOCIALS
            </h3>
            <SocialsList className='mt-2' />
          </li>
          <li className='pt-3 xl:pt-6 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400'>
            We look forward to assisting you with your luxury car needs at
            WeltCar.
          </li>
        </ul>

        <FeedbackForm />
      </div>

      <Image
        className='hidden sm:block absolute inset-0 object-contain w-full max-w-7xl m-auto opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
}
