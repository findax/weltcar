import FindCarForm from './FindCarForm';

interface IProps {
  translate: any;
}

export default function FindCarHero({
  translate
}: IProps) {
  return (
    <div className='relative md:h-[742px] lg:h-[884px]'>
      <div>
        <h1 className='text-4xl lg:text-6xl xl:text-[80px] font-bold text-neutral-1050 dark:text-white '>{translate('findCar.title')}</h1>
        <span className='block lg:w-[480px] my-9 lg:my-14 lg:text-lg text-neutral-500 dark:text-neutral-400'>
          {translate('findCar.description')}
        </span>
      </div>
      <div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <FindCarForm translate={translate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
