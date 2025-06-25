import { UserGroupIcon } from '@heroicons/react/24/outline';
import { TooltipWrapper } from './TooltipWrapper';

interface IProps {
  partnerPhone: string | null;
  partnerName: string | null;
  translate: any;
  onAuthModalOpen: () => void;
  isAuthorized: boolean;
}

export default function PartnerLogoSidebar({
  partnerPhone,
  partnerName,
  translate,
  onAuthModalOpen,
  isAuthorized,
}: IProps) {
  return (
    <div className='flex gap-2 flex-col'>
      <div className='flex gap-2'>
        <UserGroupIcon className='h-6 w-6' />
        <span className='font-medium'>
          {translate('carDetails.partnersCar.title')}
        </span>
      </div>
      {(partnerName || partnerPhone) && (
        <div className='flex gap-1'>
          {partnerName && <span className='font-medium'>{partnerName}</span>}
          {partnerPhone && (
            <div className='flex gap-4'>
              <span className='font-medium'>{partnerPhone}</span>{' '}
              {!isAuthorized && (
                <TooltipWrapper
                  id='vin-code'
                  tooltipContent={
                    <span className='whitespace-nowrap font-medium'>
                      <b
                        onClick={onAuthModalOpen}
                        className='cursor-pointer text-orange-600 underline hover:text-orange-800'
                      >
                        {translate('carDetails.tooltip.auth.clickable')}
                      </b>{' '}
                      {translate('carDetails.tooltip.auth.phoneText')}
                    </span>
                  }
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
