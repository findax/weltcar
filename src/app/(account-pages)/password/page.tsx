import Label from '@/components/Label';
import { ButtonPrimary } from '@/shared/Buttons';
import { Input } from '@/shared/FormInputs';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/audi_r8.webp';

const AccountPass = () => {
  return (
    <div className='relative space-y-6 sm:space-y-8 lg:min-h-[65vh]'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Update your password</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <div className=' max-w-xl space-y-6'>
        <div>
          <Label>Current password</Label>
          <Input type='password' className='mt-1.5' />
        </div>
        <div>
          <Label>New password</Label>
          <Input type='password' className='mt-1.5' />
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input type='password' className='mt-1.5' />
        </div>
        <div className='pt-2'>
          <ButtonPrimary>Update password</ButtonPrimary>
        </div>
      </div>
      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-10/12 m-auto opacity-[0.10] dark:opacity-[0.06] -z-10'
        src={bgImg}
        alt='premium logo'
        priority
      />
    </div>
  );
};

export default AccountPass;
