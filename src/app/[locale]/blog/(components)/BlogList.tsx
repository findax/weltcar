import { Article } from '@/types/blog';
import { useQueryParams } from '@/hooks/useQueryParams';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import BlogCard from './BlogCard';

interface IProps {
  articleListData: Article[];
  results?: number;
  translate: any;
}

const BlogList = ({
  articleListData,
  translate,
  results
}: IProps ) => {
  const { currentPage, handlePageChange } = useQueryParams();
  const pageCount = Math.ceil((results || 5) / 5);

  const renderMainCard = (item: Article) => (
    <div key={item.slug} className='lg:w-4/12 lg:h-full'>
      <BlogCard blogItem={item} heightImage='h-[228px] lg:h-[668px]' />
    </div>
  );

  const renderSmallCard = (item: Article) => (
    <div key={item.slug} className='w-full h-full'>
      <BlogCard blogItem={item} heightImage='h-[228px]' sizeTitle='!text-2xl' />
    </div>
  );

  return (
    <div className='flex flex-col gap-16 w-full'>
      <div className='flex flex-wrap w-full'>
        {
          articleListData.length > 0 ? (
            <div className='flex flex-col lg:flex-row gap-5 w-full'>
              {articleListData[0] && renderMainCard(articleListData[0])}
              <div className='grid lg:grid-cols-2 gap-5 lg:w-8/12'>
                {articleListData.slice(1).map(renderSmallCard)}
              </div>
            </div>
        ) : (
          <div className='h-[40vh] flex justify-center items-center flex-col bg-white/50 dark:bg-neutral-800/60'>
            <p className='text-2xl'>{translate('Blog.notFound.title')}</p>
          </div>
        )}
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default BlogList;
