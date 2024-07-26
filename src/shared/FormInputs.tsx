'use client';

import { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import ReactInputMask from 'react-input-mask';
import {
  EyeSlashIcon,
  EyeIcon,
  InformationCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { array } from 'yup';

const commonClass =
  'block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3';
const commonTitleClass =
  'inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1';
const commonErrorClass =
  'absolute top-full flex items-center text-left text-xs text-red-500 py-2';

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
  className?: string;
  filterCategory: string;
  id: number | string;
  label?: string;
  name: string;
  color?: string;
  defaultChecked?: boolean;
  onChange?: (name: string, id: number | string) => void;
}

export const Checkbox = ({
  className = '',
  filterCategory,
  id,
  label = '',
  name,
  color,
  defaultChecked,
  onChange,
}: CheckboxProps) => {
  return (
    <label
      htmlFor={`${filterCategory}-${id.toString()}`}
      className={`flex items-center text-sm sm:text-base cursor-pointer overflow-hidden ${className}`}
    >
      <input
        id={`${filterCategory}-${id.toString()}`}
        name={name}
        type='checkbox'
        className='mr-3.5 h-7 w-7 text-primary-500 border-primary rounded-full border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 cursor-pointer'
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(filterCategory, id)}
      />
      {label && (
        <>
          {color && (
            <span
              className='w-6 h-6 mr-2 rounded-full inline-block border border-neutral-500 flex-shrink-0'
              style={{ backgroundColor: `${color}` }}
            ></span>
          )}
          <span className='mr-4 whitespace-nowrap overflow-hidden text-ellipsis text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
            {label}
          </span>
        </>
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
      {title && <span className={commonTitleClass}>{title}</span>}
      <Field
        className={`${commonClass} ${rounded} ${sizeClass}`}
        name={name}
        disabled={disabled}
        {...args}
      />
      {error && touched ? (
        <div className={commonErrorClass}>
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
      <span className={commonTitleClass}>{title}</span>
      <Field name='phone' type='tel'>
        {({ field }: any) => (
          <ReactInputMask
            {...field}
            mask='+99 999 999999999'
            maskChar={null}
            placeholder='+49 888 324324324'
            className={commonClass}
          />
        )}
      </Field>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikPasswordInputProps {
  name?: string;
  placeholder?: string;
  title: string;
  error?: string;
  touched?: boolean;
}

export const FormikPasswordInput = ({
  name = 'password',
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
      <span className={commonTitleClass}>{title}</span>
      <div className='relative'>
        <Field
          name={name}
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
        <div className={commonErrorClass}>
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
          className={`h-7 w-7 text-primary-500 border-primary border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 cursor-pointer ${className}`}
          defaultChecked={defaultChecked}
        />
        <span className='ml-3.5 text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
          {label}
        </span>
      </label>
      {error && touched ? (
        <div className={commonErrorClass}>
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
      {title && <span className={commonTitleClass}>{title}</span>}
      <Field
        as='textarea'
        name={name}
        rows={rows}
        className={`${commonClass} ${sizeClass}`}
        {...args}
      />
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikFileProps {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  accept?: string; // MIME types or file extensions
  multiple?: boolean;
}

export const FormikFile = ({
  name,
  label = '',
  error,
  touched,
  accept,
  multiple = false,
}: FormikFileProps) => {
  const [file, setFile] = useState<FileList | null>(null);
  return (
    <fieldset className='relative'>
      {label && <span className={commonTitleClass}>{label}</span>}
      <Field name={name}>
        {({ form }: any) => (
          <>
            <label
              className="w-full py-2 px-4 flex border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 justify-between items-center rounded-2xl border-input-file file-input-label cursor-pointer"
              htmlFor={name}
            >
              <div className="flex items-center gap-4">
                <DocumentTextIcon className='w-8 flex-shrink-0' />
                <div className="flex flex-col justify-beetwen">
                  <p className="text-neutral-500">{ file ? `You have added ${file?.length} files` : 'Select a file' }</p>
                  <p className="text-primary-400 text-sm pt-2.5">JPG, JPEG, PNG or PDF</p>
                </div>
              </div>
            </label>
            <input
              style={{ display: 'none' }}
              hidden
              type='file'
              id={name}
              name={name}
              accept={accept}
              multiple={multiple}
              className={commonClass}
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files && files.length > 0) {
                  setFile(files);
                  form.setFieldValue(name, Array.from(files)); // Convert FileList to Array
                } else {
                  setFile(null);
                  form.setFieldValue(name, []); // Set an empty array if no files selected
                }
              }}
            />
          </>
        )}
      </Field>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {error}
        </div>
      ) : null}
    </fieldset>
  );
};