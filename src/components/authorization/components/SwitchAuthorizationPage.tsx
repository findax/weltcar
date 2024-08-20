'use client';

import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface IProps {
  isClientSwitch: boolean;
  onChange: (isClientSwitch : boolean) => void;
  className?: string;
}

const SwitchAuthorizationPage = ({
  onChange,
  className,
  isClientSwitch
}:IProps) => {
  const [isToggle, setIsToggle] = useState(isClientSwitch);

  const handleChangeToggle = () => {
    setIsToggle(!isToggle);
    onChange(!isToggle);
  }
  return (
    <div className={`inline-flex ${className}`}>
      <Switch
        checked={isToggle}
        onChange={handleChangeToggle}
        className='bg-teal-600 relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        <span
          aria-hidden='true'
          className={`${isToggle ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default SwitchAuthorizationPage;
