import { useQueryParams } from '@/hooks/useQueryParams';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { GalleryCarMedia } from '@/types/gallery';
import GalleryCard from '@/components/GalleryCard';

interface IProps {
  galleries: GalleryCarMedia[];
  results?: number;
  translate: any;
}

const GalleryList = ({
  galleries,
  translate,
  results
}: IProps ) => {
  const { currentPage, handlePageChange } = useQueryParams();
  const pageCount = Math.ceil((results || 5) / 5);

  const paddingBottomGrid = 'pb-[61.8%]';
  return (
    <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-3 mb-8 md:mb-14'>
      {galleries?.map((gallery) => (
        <GalleryCard
          key={gallery.id}
          carData={gallery}
          paddingBottomGrid={paddingBottomGrid}
          translate={translate}
        />
      ))}
    </div>
    // <div className='flex flex-col gap-16 w-full'>

    //   {/* <div>
    //     {pageCount > 1 && (
    //       <ReactPaginate
    //         containerClassName={
    //           'flex mb-8 md:mb-14 justify-center items-center gap-1'
    //         }
    //         pageClassName={
    //           'flex w-11 h-11 items-center justify-center rounded-full overflow-hidden bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'
    //         }
    //         pageLinkClassName={'w-11 h-11 flex items-center justify-center'}
    //         activeLinkClassName={'!bg-primary-600 !text-white'}
    //         previousLinkClassName={'w-11 h-11 flex items-center justify-center'}
    //         previousLabel={<ChevronLeftIcon className='w-6 mr-0.5' />}
    //         previousClassName={'w-11 h-11 flex items-center justify-center'}
    //         nextLinkClassName={'flex w-11 h-11 items-center justify-center'}
    //         nextLabel={<ChevronRightIcon className='w-6 ml-0.5' />}
    //         nextClassName={'w-11 h-11 flex items-center justify-center'}
    //         marginPagesDisplayed={1}
    //         pageRangeDisplayed={3}
    //         // breakClassName={''}
    //         breakLinkClassName={
    //           'w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'
    //         }
    //         breakLabel={'...'}
    //         pageCount={pageCount}
    //         forcePage={currentPage - 1}
    //         renderOnZeroPageCount={null}
    //         onPageChange={handlePageChange}
    //       />
    //     )}
    //   </div> */}
    // </div>
  );
};

export default GalleryList;
