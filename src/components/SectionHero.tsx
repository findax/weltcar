import sectionHeroCar from '@/images/car-1.png';
import Image from 'next/image';
import SearchForCar from './SearchForCar';

interface IProps {
  translate: any;
}

export default function SectionHeroArchivePage({ translate }: IProps) {
  return (
    <div
      className='nc-SectionHeroArchivePage flex flex-col relative'
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='flex flex-col space-y-14 lg:space-y-16 text-left'>
        <h1 className='text-neutral-1050 font-bold text-4xl lg:text-6xl xl:text-[83px] xl:leading-[120%] xl:tracking-wide dark:text-white'>
          {translate('welcome.title.Welcome')}
        </h1>
        <div className='flex max-lg:flex-col max-lg:gap-8 lg:items-center justify-between'>
          <div className='flex-1 lg:basis-[100px] lg:max-w-[500px]'>
            <SearchForCar translate={translate} />
          </div>

          <div className='flex-1 lg:basis-[500px]'>
            <Image
              className='w-full'
              src={sectionHeroCar}
              alt='premium logo background car'
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
