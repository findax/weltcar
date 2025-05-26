import LoadingSpinner from '@/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  );
}
