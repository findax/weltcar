import { SaveIcon, ShareIcon } from '@/shared/icons';

const ShareSaveBtns = () => {
  return (
    <div className='flow-root'>
      <div className='flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5'>
        <span className='py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer'>
          <ShareIcon />
          <span className='hidden sm:block ml-2.5'>Share</span>
        </span>
        <span className='py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer'>
          <SaveIcon />
          <span className='hidden sm:block ml-2.5'>Save</span>
        </span>
      </div>
    </div>
  );
};

export default ShareSaveBtns;
