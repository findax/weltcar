'use client';

import { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import ReactInputMask from 'react-input-mask';
import {
  EyeSlashIcon,
  EyeIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const commonClass =
  'block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      sizeClass,
      fontClass,
      rounded,
      children,
      type = 'text',
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`${commonClass} ${rounded} ${fontClass} ${sizeClass} ${className}`}
        {...args}
      />
    );
  }
);

interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  defaultChecked,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type='checkbox'
        className='focus:ring-action-primary h-7 w-7 text-primary-500 border-primary rounded-full border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500 cursor-pointer'
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <span className='ml-3.5 text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400 cursor-pointer'>
          {label}
        </span>
      )}
    </label>
  );
};

{
  //* -- Formik Inputs -- *//
}
interface FormikInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  title?: string;
  error?: string;
  touched?: boolean;
  rounded?: string;
  sizeClass?: string;
  disabled?: boolean;
}

export const FormikInput = ({
  name,
  title,
  error,
  touched,
  rounded,
  sizeClass,
  disabled = false,
  ...args
}: FormikInputProps) => {
  return (
    <fieldset className='relative'>
      {title && (
        <span className='inline-block text-sm text-neutral-800 dark:text-neutral-200 mb-1'>
          {title}
        </span>
      )}
      <Field
        name={name}
        className={`${commonClass} ${rounded} ${sizeClass}`}
        disabled={disabled}
        {...args}
      />
      {error && touched ? (
        <div className='absolute top-full flex items-center text-left text-xs text-red-500 py-2'>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikPhoneNumberInputProps {
  title: string;
  error?: string;
  touched?: boolean;
}

export const FormikPhoneNumberInput = ({
  title,
  error,
  touched,
}: FormikPhoneNumberInputProps) => {
  return (
    <fieldset className='relative'>
      <span className='inline-block text-sm text-neutral-800 dark:text-neutral-200 mb-1'>
        {title}
      </span>
      <Field name='phone' type='tel'>
        {({ field }: any) => (
          <ReactInputMask
            {...field}
            mask='+49 999 999999999'
            maskChar={null}
            placeholder='+49 888 324324324'
            className={commonClass}
          />
        )}
      </Field>
      {error && touched ? (
        <div className='absolute top-full flex items-center text-left text-xs text-red-500 py-2'>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikPasswordInputProps {
  placeholder?: string;
  title: string;
  error?: string;
  touched?: boolean;
}

export const FormikPasswordInput = ({
  title,
  error,
  touched,
  ...args
}: FormikPasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <fieldset className='relative'>
      <span className='inline-block text-sm text-neutral-800 dark:text-neutral-200 mb-1'>
        {title}
      </span>
      <div className='relative'>
        <Field
          name='password'
          type={isPasswordVisible ? 'text' : 'password'}
          className={commonClass}
          {...args}
        />
        <button
          type='button'
          className='absolute top-1/2 -translate-y-1/2 right-0 pr-3 flex items-center'
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeIcon className='w-5' />
          ) : (
            <EyeSlashIcon className='w-5' />
          )}
        </button>
      </div>
      {error && touched ? (
        <div className='absolute top-full flex items-center text-left text-xs text-red-500 py-2'>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          <span>{error}</span>
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikCheckboxProps {
  name: string;
  label?: string;
  className?: string;
  defaultChecked?: boolean;
  error?: string;
  touched?: boolean;
}

export const FormikCheckbox = ({
  name,
  label = '',
  className = 'rounded-full',
  defaultChecked,
  error,
  touched,
}: FormikCheckboxProps) => {
  return (
    <fieldset className='relative'>
      <label htmlFor={name} className='flex items-center cursor-pointer'>
        <Field
          id={name}
          name={name}
          type='checkbox'
          className={`focus:ring-action-primary h-7 w-7 text-primary-500 border-primary border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500 cursor-pointer ${className}`}
          defaultChecked={defaultChecked}
        />
        <span className='ml-3.5 text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
          {label}
        </span>
      </label>
      {error && touched ? (
        <div className='absolute top-full flex items-center text-left text-xs text-red-500 py-2'>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};
interface FormikTextareaProps {
  name: string;
  type?: string;
  placeholder?: string;
  title?: string;
  error?: string;
  touched?: boolean;
  rows?: number;
  sizeClass?: string;
}

export const FormikTextarea = ({
  name,
  title,
  error,
  touched,
  rows,
  sizeClass = 'h-auto',
  ...args
}: FormikTextareaProps) => {
  return (
    <fieldset className='relative'>
      {title && (
        <span className='inline-block text-sm text-neutral-800 dark:text-neutral-200 mb-1'>
          {title}
        </span>
      )}
      <Field
        as='textarea'
        name={name}
        rows={rows}
        className={`${commonClass} ${sizeClass}`}
        {...args}
      />
      {error && touched ? (
        <div className='absolute top-full flex items-center text-left text-xs text-red-500 py-2'>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};
