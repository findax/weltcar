import { UserGroupIcon } from '@heroicons/react/24/outline';

interface IProps {
  partnerPhone: string | null;
  partnerName: string | null;
  translate: any;
}

export default function PartnerLogoSidebar({
  partnerPhone,
  partnerName,
  translate
}:IProps) {
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2'>
        <UserGroupIcon className='h-6 w-6' />
        <span className='font-medium'>{translate('carDetails.partnersCar.title')}</span>
      </div>
      {(partnerName || partnerPhone ) && 
        <div className='flex gap-1'>
          { partnerName && <span className='font-medium'>{partnerName}</span>}
          { partnerPhone && <span className='font-medium'>{partnerPhone}</span>}
        </div>
      }
    </div>
  );
}
