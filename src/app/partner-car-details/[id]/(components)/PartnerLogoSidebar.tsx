import { IUser } from '@/types/user';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface IProps {
  userData: IUser;
}

export default function PartnerLogoSidebar({
  userData
}:IProps) {
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2'>
        <UserGroupIcon className='h-6 w-6' />
        <span className='font-medium'>Partner’s Car</span>
      </div>
      <div className='flex gap-1'>
        <span className='font-medium'>{userData.name}</span>
        <span className='font-medium'>{userData.phone}</span>
      </div>
    </div>
  );
}
