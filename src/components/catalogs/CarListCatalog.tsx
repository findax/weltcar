import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import CarCard from '@/components/CarCard';
import CarCardH from '@/components/CarCardH';
import CarCardHSkeleton from '@/components/CarCardHSkeleton';
import CarCardSkeleton from '@/components/CarCardSkeleton';
import { ICar } from '@/types/catalog';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserStore } from '@/stores/user-store';

interface CarListProps {
  carListData: ICar[];
  isLoading: boolean;
  isGrid: boolean;
  results?: number;
  translate: any;
}

const CarListCatalog = ({ 
  carListData, 
  isLoading, 
  isGrid, 
  results,
  translate 
}: CarListProps) => {
  const { currentPage, handlePageChange } = useQueryParams();
  const user = useUserStore((state) => state.user);

  const ww = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const pageCount = Math.ceil((results || 10) / 10);
  const paddingBottomGrid = 'pb-[61.8%]';
  const paddingBottomHorizontal =
    'pb-[67.6%] lg:pb-[83.8%] xl:pb-[63%] 2xl:pb-[60%]';

  return (
    <>
      {ww > 767 && !isGrid ? (
        isLoading ? (
          <CarCardHSkeleton paddingBottomHorizontal={paddingBottomHorizontal} />
        ) : carListData.length > 0 ? (
          <div className='flex flex-col gap-4 lg:gap-6 mb-8 md:mb-14'>
            {carListData.map((car) => (
              <CarCardH
                key={car.id}
                carData={car}
                paddingBottomHorizontal={paddingBottomHorizontal}
                translate={translate}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
            <p className='text-2xl'>{translate('catalog.notFound.title')}</p>
          </div>
        )
      ) : isLoading ? (
        <CarCardSkeleton paddingBottomGrid={paddingBottomGrid} />
      ) : carListData.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 mb-8 md:mb-14'>
          {carListData.map((car) => (
            <CarCard
              key={car.id}
              carData={car}
              paddingBottomGrid={paddingBottomGrid}
              translate={translate}
              user={user}
            />
          ))}
        </div>
      ) : (
        <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
          <p className='text-2xl'>{translate('catalog.notFound.title')}</p>
        </div>
      )}
      {pageCount > 1 && (
        <ReactPaginate
          containerClassName={
            'flex mb-8 md:mb-14 justify-center items-center gap-1'
          }
          pageClassName={
            'flex w-11 h-11 items-center justify-center rounded-full overflow-hidden bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'
          }
          pageLinkClassName={'w-11 h-11 flex items-center justify-center'}
          activeLinkClassName={'!bg-primary-600 !text-white'}
          previousLinkClassName={'w-11 h-11 flex items-center justify-center'}
          previousLabel={<ChevronLeftIcon className='w-6 mr-0.5' />}
          previousClassName={'w-11 h-11 flex items-center justify-center'}
          nextLinkClassName={'flex w-11 h-11 items-center justify-center'}
          nextLabel={<ChevronRightIcon className='w-6 ml-0.5' />}
          nextClassName={'w-11 h-11 flex items-center justify-center'}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          // breakClassName={''}
          breakLinkClassName={
            'w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'
          }
          breakLabel={'...'}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          renderOnZeroPageCount={null}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default CarListCatalog;
