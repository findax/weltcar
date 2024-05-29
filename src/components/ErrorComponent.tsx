import { XCircleIcon } from '@heroicons/react/24/outline';

export default function ErrorComponent() {
  return (
    <div className='text-center'>
      <XCircleIcon className='block mx-auto w-24 h-24 text-red-500 mb-10' />
      <p className='px-6 text-2xl font-semibold'>
        An error occurred. <br />
        Please, try again later
      </p>
    </div>
  );
}
