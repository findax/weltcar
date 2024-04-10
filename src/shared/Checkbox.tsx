'use client';

import React, { FC } from 'react';

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type='checkbox'
        className='focus:ring-action-primary h-7 w-7 text-primary-500 border-primary rounded-full border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500 cursor-pointer'
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className='ml-3.5 flex flex-col flex-1 justify-center cursor-pointer'
        >
          <span className=' text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
            {label}
          </span>
          {subLabel && (
            <p className='mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light'>
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
