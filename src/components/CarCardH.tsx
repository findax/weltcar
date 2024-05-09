import { CarDataType } from '@/data/types';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import SaleOffBadge from '@/components/SaleOffBadge';
import Badge from '@/shared/Badge';
import CardSlider from '@/components/CardSlider';
import Link from 'next/link';
import { ButtonPrimary } from '@/shared/Buttons';
import numberWithComma from '@/utils/numberWithComma';

const CarCardH = ({
  className = '',
  carData,
}: {
  className?: string;
  carData: CarDataType;
}) => {
  const { id, galleryImgs, brand, model, saleOff, isAds, price } = carData;

  const renderContent = () => {
    return (
      <div className='h-full flex justify-between flex-col p-5  space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              {/* {isAds && <Badge name='ADS' color='green' />} */}
              <h2 className='text-xl font-semibold'>
                <span className='line-clamp-1'>
                  {brand} {model}
                </span>
              </h2>
            </div>
            <span className='text-xl font-semibold'>2024</span>
          </div>
          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            <span className=''>{id}</span>
            {/* <span>-</span>
            <span className=''>{gearshift} </span> */}
          </div>

          {/* <div className='columns-1 md:columns-2'>
            <span className='flex items-center gap-2 pt-2'>
              <svg fill='#22804A' height='24' width='24' viewBox='0 0 24 24'>
                <path d='M8,10H16V18H11L9,16H7V11M7,4V6H10V8H7L5,10V13H3V10H1V18H3V15H5V18H8L10,20H18V16H20V19H23V9H20V12H18V8H12V6H15V4H7Z'></path>
              </svg>
              Engine
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <i className='las la-gas-pump text-2xl text-[#22804A]'></i> Hybrid
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <i className='las la-tachometer-alt text-2xl text-[#22804A]'></i>
              6.1km/ 1 Litre
            </span>
            <span className='flex items-center gap-2 pt-2'>
              <svg
                height='18'
                width='18'
                fill='#22804A'
                id='Layer_1'
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 122.88 122.88'
              >
                <path d='M61.44,0A61.46,61.46,0,1,1,18,18,61.23,61.23,0,0,1,61.44,0Zm4.07,82.09a6.67,6.67,0,1,1-8.14,0V68.62H42.31V82.09a6.67,6.67,0,1,1-8.14,0V46.17a6.67,6.67,0,1,1,8.14,0V60.48H57.37V46.17a6.67,6.67,0,1,1,8.14,0V60.48H80.57V46.17a6.67,6.67,0,1,1,8.14,0V64a4.41,4.41,0,0,1,0,.52,4.07,4.07,0,0,1-4.07,4.07H65.51V82.09Zm33-57.76a52.46,52.46,0,1,0,15.38,37.11A52.29,52.29,0,0,0,98.55,24.33Z' />
              </svg>
              Automatic
            </span>
          </div> */}
        </div>

        <div className='space-y-2 py-3'>
          <div className='flex items-center'>
            <span className=''>exterior color:</span>
            <span className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500 bg-[#fff]'></span>
            <span className=''> - white</span>
          </div>
          <div className='flex items-center'>
            <span className=''>interior color:</span>
            <span className='w-6 h-6 mx-2 rounded-full inline-block border border-neutral-500 bg-[#000]'></span>
            <span className=''> - black</span>
          </div>
        </div>

        <div className='border-t border-dashed border-neutral-300 dark:border-neutral-700'></div>
        <div className='flex justify-between items-center'>
          <span className='text-3xl font-semibold text-primary-400'>
            {numberWithComma(price)}€
          </span>
          <ButtonPrimary>See more</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden ${className}`}
    >
      <div className='flex flex-col md:flex-row'>
        <div className='relative w-full flex items-center justify-center md:w-[45%] flex-shrink-0 border-r border-neutral-200/80 dark:border-neutral-700'>
          <div className='w-full'>
            <CardSlider
              ratioClass='aspect-w-6 aspect-h-4'
              galleryImgs={galleryImgs}
            />
          </div>
          {/* <BtnLikeIcon isLiked={like} className='absolute right-3 top-3' /> */}
          {/* {saleOff && <SaleOffBadge className='absolute left-3 top-3' />} */}
        </div>
        <Link href={`/car-details/${id}`} className='w-full'>
          {renderContent()}
        </Link>
      </div>
    </div>
  );
};

export default CarCardH;
