import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function PartnerLogoSidebar() {
  return (
    <div className='flex gap-2'>
      <UserGroupIcon className='h-6 w-6' />
      <span className='font-medium'>Partner’s Car</span>
    </div>
  );
}
