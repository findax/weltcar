import carImg from '@/images/car-3.png';
import Image from 'next/image';
import { ButtonPrimary } from '@/shared/Buttons';

interface IProps {
  translate: any;
}

const SectionHero = ({
  translate
}: IProps) => {
  return (
    <div className='nc-SectionHero relative'>
      <div className='relative flex items-center flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-6 2xl:space-x-0 justify-between text-left'>
        <div className='lg:w-max'>
          <h1 className='text-neutral-1050 dark:text-white font-bold text-4xl lg:text-6xl xl:text-[80px] flex flex-col gap-2'>
            {translate('about.title.about')}  
            <span className='text-primary-600 dark:text-primary-950'>{translate('about.title.weltCar')}</span>
          </h1>
          <div className='w-full lg:w-[400px] xl:w-[520px]'>
            <div className='mt-10 mb-8 xl:text-lg text-neutral-500 dark:text-neutral-400 lg:max-w-3xl'>
              {translate('about.description')}
            </div>
            <ButtonPrimary className='xl:text-lg w-full sm:w-fit' sizeClass='px-5 py-4 sm:px-7' href='/catalog'>
              {translate('about.button.startSearch')}
            </ButtonPrimary>
          </div>
          <div className='absolute -z-10 -bottom-[52%] xsX:-bottom-[80%] -right-[35%] xsX:-right-[25%] sm:max-w-[90%] md:w-[70%] lg:w-2/3 xl:w-fit md:top-[74%] lg:top-[27%] md:right-0 flex-grow'>
            <Image 
              src={carImg}  
              alt='premium logo background' 
              priority 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
