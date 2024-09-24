import Link from 'next/link';
import SocialsList from '@/shared/SocialsList';
import FeedbackForm from './FeedbackForm';
import Image from 'next/image';
import carImg from '@/images/car-4.png';
import { WatsappIcon } from '@/shared/icons';

export default function ContactHero() {
  return (
    <div className='relative'>
      <div>
        <h2 className='text-4xl lg:text-6xl xl:text-[80px] font-bold text-neutral-1050 dark:text-white '>Contact Us</h2>
        <span className='block lg:w-[480px] my-9 lg:my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          Whether you have questions about our vehicles, need assistance with your purchase, or want to learn more about our services, we are here to help. Reach out to us through any of the following methods:
        </span>
      </div>
      <div className='flex-shrink-0'>
        <div className='flex gap-5 lg:gap-0 flex-col lg:flex-row justify-between border border-white bg-white dark:border-neutral-950 dark:bg-neutral-950 p-10 rounded-3xl '>
          <div className='w-full lg:w-[18%]'>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>📍</span>ADDRESS
            </h3>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='https://www.google.com/maps?q=FinDax+GmbH,+Theodor-Fontane-Stra%C3%9Fe+2,+22848+Norderstedt,+Germany&ftid=0x47b229e490544979:0x29213d5a4a4d551b&entry=gps&lucs=,94224825,94227247,94227248,94222042,47071704,47069508,94214172,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTE5LjEuNjYwNTAYACCenQoqbCw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw5NDIyMjA0Miw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxNDE3Miw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUU%3D&g_st=com.google.maps.preview.copy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Theodor-Fontane-Straße 2, 22848 Norderstedt
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>✉️</span>EMAIL
            </h3>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='mailto:info@findax.eu'
            >
              info@findax.eu
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>📞</span>PHONE
            </h3>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='tel:+4915902465256'
            >
              +49 1590 2465256
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              <WatsappIcon className='w-4 inline-block mr-3' />
              MESSENGER
            </h3>
            <Link
              className='inline-block mt-4 lg:mt-2 text-neutral-500 dark:text-neutral-400 hover:underline'
              href='https://wa.me/&#x2B;4915902465256'
              target='_blank'
              rel='noreferrer noopener'
            >
              +49 1590 2465256
            </Link>
          </div>
          <div className='w-full lg:w-[18%]'>
            <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
              <span className='mr-3'>🌏</span>SOCIALS
            </h3>
            <SocialsList className='mt-4 lg:mt-2' />
          </div>
        </div>

        <div className='flex gap-16 lg:gap-8 flex-col-reverse lg:flex-row mt-14 justify-between'>
          <div className='flex flex-grow justify-center lg:justify-start shrink'>
            <Image
              src={carImg}
              alt='mercedes icon'
            />
          </div>
          <div className='w-full lg:w-[480px]'>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
