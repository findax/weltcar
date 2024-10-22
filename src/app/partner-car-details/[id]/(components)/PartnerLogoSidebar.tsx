import { ButtonPrimary } from '@/shared/Buttons';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface IProps {
  onClick: () => void;
  className?: string;
}

export default function PartnerLogoSidebar({
  onClick,
  className = ''
}: IProps) {
  return (
    <div className='block flex-grow mt-14 lg:mt-0'>
      <div className={`detailsSection__wrap sm:bg-white dark:bg-neutral-900 ${className}`}>
        <div className='flex gap-2'>
          <UserGroupIcon className='h-6 w-6' />
          <span className='font-medium'>Partner’s Car</span>
        </div>

        {/* <ButtonPrimary
          onClick={onClick}
          disabled={false}
          className={false ? '!bg-gray-600 hover:bg-gray-600' : ''}
        >
          {false ? '' : 'Contact'}
        </ButtonPrimary> */}
      </div>
    </div>
  );
}
