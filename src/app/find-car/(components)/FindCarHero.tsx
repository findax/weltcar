import Link from 'next/link';
import SocialsList from '@/shared/SocialsList';
import Image from 'next/image';
import carImg from '@/images/car-4.png';
import FindCarForm from './FindCarForm';

export default function FindCarHero() {
  return (
    <div className='relative'>
      <div>
        <h2 className='text-4xl lg:text-6xl xl:text-[80px] font-bold text-neutral-1050 dark:text-white '>Find Car</h2>
        <span className='block lg:w-[480px] my-9 lg:my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          If you are looking for a specific car, please fill out the form, and our specialist will contact you to provide all the necessary information. We strive to make the process of searching for and purchasing a car as convenient as possible for you.
        </span>
      </div>
      <div className=''>
        

        <div className='flex justify-center'>
          <div className='w-full lg:w-[480px]'>
            <FindCarForm />
          </div>
        </div>
      </div>
    </div>
  );
}
