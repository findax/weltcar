import { GalleryCarMedia } from '@/types/gallery';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import CardSlider from './CardSlider';
import Link from 'next/link';
import { Route } from 'next';


const GalleryCard = ({
  className = '',
  carData,
  paddingBottomGrid,
  translate,
}: {
  className?: string;
  carData: GalleryCarMedia;
  paddingBottomGrid: string;
  translate?: any;
}) => {
  const {
    id,
    images,
    name,
    videos
  } = carData;
  const locale = useLocale();

  return (
      <Link
        href={`/gallery-details/${id}` as Route} 
        target='_blank'
        className={`relative flex flex-col dark:hover:shadow-[0_0_55px_rgba(131,181,196,0.4)] hover:shadow-[0_0_55px_rgba(0,102,132,0.4)] border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
        data-nc-id='GalleryCard'
      >
        <div className='relative w-full h-[250px] overflow-hidden'>
          <Image 
            src={images[0].thumb}
            alt={images[0].title}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex justify-between px-6 py-6'>
          <div className='text-lg font-semibold'>
            {name}
          </div>

          <div className='text-lg font-semibold'>
            {images[0].description}
          </div>
        </div>

      </Link>
  );
};

export default GalleryCard;
