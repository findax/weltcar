import Link from 'next/link';
import Image from 'next/image';
import carImg from '@/images/car-4.png';
import { WatsappIcon } from '@/shared/icons';

interface IProps{
  translate: any;
}

export default function LookingForHero({
  translate
}: IProps) {
  return (
    <div className='relative'>
      <div>
        <h1 className='text-4xl lg:text-6xl xl:text-[80px] font-bold text-neutral-1050 dark:text-white'>
          {translate('lookingFor.title.looking')}
        </h1>
        <span className='block lg:w-[480px] mt-8 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('lookingFor.subtitle.updating')}
          {translate('lookingFor.subtitle.looking')}
        </span>
      </div>
    </div>
  );
}
