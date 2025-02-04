import { IUser } from '@/types/user';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface IProps {
  partnerPhone: string | null;
  partnerName: string | null;
  status_extra: string | null;
  translate: any;
}

export default function PartnerLogoSidebar({
  partnerPhone,
  partnerName,
  status_extra,
  translate
}:IProps) {
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2'>
        <UserGroupIcon className='h-6 w-6' />
        <span className='font-medium'>{translate('carDetails.partnersCar.title')}</span>
      </div>
      {/* <div className='flex gap-1'>
        <span className='font-medium'>{partnerName}</span>
        <span className='font-medium'>{partnerPhone}</span>
      </div> */}
      {status_extra && 
        <div className='flex gap-1'>
          <span className='font-medium md:text-lg dark:text-neutral-400 text-neutral-1100'>Available {status_extra}</span>
        </div>
      }
    </div>
  );
}
