import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='space-y-6'>
      <form className='grid grid-cols-1 gap-6' action='#' method='post'>
        <label className='block'>
          <span className='text-neutral-800 dark:text-neutral-200'>
            Email address
          </span>
          <Input
            type='email'
            placeholder='example@example.com'
            className='mt-1'
          />
        </label>
        <label className='block'>
          <span className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
            Password
            <button type='button' className='text-sm underline font-medium'>
              Forgot password?
            </button>
          </span>
          <Input type='password' className='mt-1' />
        </label>
        <ButtonPrimary type='submit'>Continue</ButtonPrimary>
      </form>
    </div>
  );
}
