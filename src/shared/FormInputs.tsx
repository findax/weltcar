'use client';

import { useState, forwardRef, InputHTMLAttributes, useRef, LegacyRef, useEffect } from 'react';
import { Field, useField, useFormikContext } from 'formik';
import ReactInputMask from 'react-input-mask';
import {
  EyeSlashIcon,
  EyeIcon,
  InformationCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { HiOutlineSearch, HiCheck } from "react-icons/hi";

import { Route } from 'next';
import Link from 'next/link';
import { ICountries, IModels, IPartnerResponse, ISelectorFindCar } from '@/types/partner'; 
import { useLocale, useTranslations } from 'next-intl';
import priceWithComma from '@/utils/priceWithComma';


const commonClass =
  'block w-full border-neutral-200 focus:border-primary-300 focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-1100 dark:focus:bg-neutral-1100 !text-lg dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-1150 rounded-2xl font-normal h-11 px-7 py-3';
const commonTitleClass =
  'inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-3';
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

interface RadioButtonProps {
  className?: string;
  label?: string;
  borderStyle?: string;
  sizeStyle?: string;
  name: string;
  checked?: boolean;
  onChange: () => void;
}

export const RadioButton = ({
  className = '',
  label = '',
  borderStyle = 'rounded-full',
  sizeStyle = 'w-6 h-6',
  name,
  checked,
  onChange,
}: RadioButtonProps) => {
  const translate = useTranslations();
  return (
    <label
      htmlFor={name}
      className={`flex items-center text-sm sm:text-base cursor-pointer overflow-hidden ${className}`}
    >
      <input
        id={name}
        name={name}
        type='checkbox'
        className="hidden peer"
        checked={checked}
        onChange={onChange}
      />
       <span
        className={`
          flex items-center justify-center border-2 border-primary-600 dark:border-primary-950 ${borderStyle} ${sizeStyle}
          transition-all duration-200
        `}
      >
        { checked && <HiCheck className="dark:text-primary-950 text-primary-600 h-4 w-4" />}
      </span>
      {label && (
        <>
          <span className='ml-3 whitespace-nowrap overflow-hidden text-ellipsis text-neutral-1100 dark:text-white md:text-lg'>
            {translate(label)}
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
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormikInput = ({
  name,
  title,
  error,
  onKeyPress,
  touched,
  rounded,
  sizeClass,
  disabled = false,
  placeholder,
  ...args
}: FormikInputProps) => {
  const translate = useTranslations();
  return (
    <fieldset className='relative flex flex-col h-full justify-between'>
      {title && <span className={commonTitleClass}>{translate(title)}</span>}
      <Field
        className={`${commonClass} ${rounded} ${sizeClass} .custom-input`}
        name={name}
        onKeyPress={onKeyPress}
        disabled={disabled}
        placeholder={translate(placeholder)}
        {...args}
      />
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};

export const FormikInputPrice = ({
  name,
  title,
  error,
  onKeyPress,
  touched,
  rounded,
  sizeClass,
  disabled = false,
  placeholder,
  ...args
}: FormikInputProps) => {
  const translate = useTranslations();
  const { setFieldValue, values } = useFormikContext<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = priceWithComma(inputValue);
    setFieldValue(name, inputValue);
    e.target.value = String(formattedValue);
  };

  return (
    <fieldset className='relative flex flex-col h-full justify-between'>
      {title && <span className={commonTitleClass}>{translate(title)}</span>}
      <Field
        className={`${commonClass} ${rounded} ${sizeClass} .custom-input`}
        value={priceWithComma(values[name])}
        name={name}
        onKeyPress={onKeyPress}
        disabled={disabled}
        placeholder={translate(placeholder)}
        {...args}
        onChange={handleChange}
      />
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};


interface FormikPhoneNumberInputProps {
  title: string;
  error?: string;
  sizeClass?: string;
  rounded?: string;
  touched?: boolean;
  disabled?: boolean;
}

export const FormikPhoneNumberInput = ({
  title,
  error,
  sizeClass,
  rounded,
  touched,
  disabled = false
}: FormikPhoneNumberInputProps) => {
  const translate = useTranslations();
  return (
    <fieldset className='relative'>
      <span className={commonTitleClass}>{translate(title)}</span>
      <Field 
        name='phone' 
        type='tel' 
        disabled={disabled} 
      >
        {({ field }: any) => (
          <ReactInputMask
            {...field}
            mask='+99 999 999999999'
            maskChar={null}
            placeholder='+49 888 324324324'
            className={`${commonClass} ${rounded} ${sizeClass}`}
          />
        )}
      </Field>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
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
  rounded?: string;
  sizeClass?: string;
}

export const FormikPasswordInput = ({
  name = 'password',
  title,
  error,
  touched,
  rounded,
  sizeClass,
  placeholder,
  ...args
}: FormikPasswordInputProps) => {
  const translate = useTranslations();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <fieldset className='relative'>
      <span className={commonTitleClass}>{translate(title)}</span>
      <div className='relative'>
        <Field
          name={name}
          type={isPasswordVisible ? 'text' : 'password'}
          className={`${commonClass} ${rounded} ${sizeClass}`}
          placeholder={translate(placeholder)}
          {...args}
        />
        <button
          type='button'
          className='absolute top-1/2 -translate-y-1/2 right-0 pr-7 flex items-center'
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
          <span>{translate(error)}</span>
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikCheckboxProps {
  name: string;
  label?: string;
  href?: Route<string>;
  className?: string;
  defaultChecked?: boolean;
  error?: string;
  touched?: boolean;
}

export const FormikCheckbox = ({
  name,
  href = undefined,
  label = '',
  className = 'rounded-full',
  defaultChecked,
  error,
  touched,
}: FormikCheckboxProps) => {
  const translate = useTranslations();
  const locale = useLocale();

  const renderingNavLinkLabel = () => {
    let ourLabel, linkStr, strLabel;
    if(locale.length === 2) {
      ourLabel = translate(label).split(" ");
      linkStr = ourLabel.slice(-2).join(" ");
      strLabel = ourLabel.slice(0, -2).join(" ");
    } else {
      ourLabel = translate(label).split("");
      linkStr = ourLabel.slice(-4).join(" ").replaceAll(' ', '');
      strLabel = ourLabel.slice(0, -4).join(" ").replaceAll(' ', '');
    }
    if(href){
      return (
        <label htmlFor={name} className='flex items-center cursor-pointer'>
          <Field
            id={name}
            name={name}
            type='checkbox'
            className={`h-7 w-7 text-primary-500 border-primary border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 cursor-pointer ${className}`}
            defaultChecked={defaultChecked}
          />
          <span className='ml-3.5 mr-2 text-xs xs:text-base text-neutral-900 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
            {`${translate(strLabel)}`}
          </span>
          <Link 
            target='_blank'
            className='text-primary-500 text-xs xs:text-base hover:text-primary-400' 
            href={href}
          >
            {linkStr}
          </Link>
      </label>
      )
    } else {
      return (
        <label htmlFor={name} className='flex items-center cursor-pointer'>
          <Field
            id={name}
            name={name}
            type='checkbox'
            className={`h-7 w-7 text-primary-500 border-primary border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 cursor-pointer ${className}`}
            defaultChecked={defaultChecked}
          />
          <span className='ml-3.5 text-neutral-900 text-xs xs:text-base hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-400'>
            {translate(label)}
          </span>
      </label>
      )
    }
  }

  return (
    <fieldset className='relative'>
      {renderingNavLinkLabel()}
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
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
  rounded?: string;
  sizeClass?: string;
  disabled?: boolean;
}

export const FormikTextarea = ({
  name,
  title,
  error,
  touched,
  rows,
  rounded,
  sizeClass,
  disabled,
  placeholder,
  ...args
}: FormikTextareaProps) => {
  const translate = useTranslations();
  
  // const { values, setFieldValue } = useFormikContext<any>();
  // function stripHtmlTags(html: string) {
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent || "";
  // }
  return (
    <fieldset className='relative'>
      {title && <span className={commonTitleClass}>{translate(title)}</span>}
      <Field
        disabled={disabled}
        as='textarea'
        name={name}
        rows={rows}
        placeholder={translate(placeholder)}
        className={`${commonClass} ${rounded} ${sizeClass} h-auto`}
        {...args}
      />
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};

interface IPropsInitialValues {
  companyName: string;
  taxNumber: string;
  documents: undefined;
  email: string;
  phone: string;
}

interface FormikFileProps {
  name: string;
  variant?: string;
  subTitle?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  accept?: string;
  multiple?: boolean;
  initialValues?: IPropsInitialValues | any | null;
  disabled?: boolean;
}

export const FormikFile = ({
  name,
  label = '',
  subTitle = 'JPG, JPEG, or PNG',
  error,
  variant,
  touched,
  accept,
  multiple = false,
  initialValues,
  disabled = false
}: FormikFileProps) => {
  const translate = useTranslations();
  const [files, setFiles] = useState<File[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    initialValues && setFiles(null);
  },[initialValues])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, form: any) => {
    const fileList = event.target.files;
    if (fileList) {
      if (files) {
        setFiles([...files, ...Array.from(fileList)])
        form.setFieldValue(name, [...files, ...Array.from(fileList)]); // Convert FileList to Array
      } else {
        setFiles(Array.from(fileList))
        form.setFieldValue(name, Array.from(fileList)); // Convert FileList to Array
      }
    } else {
      setFiles(null);
      form.setFieldValue(name, []); // Set an empty array if no files selected
    }
  }

  const handleDeleteFile = (event: React.MouseEvent<HTMLButtonElement>, file: File, form:any) => {
    event.preventDefault();
    if(files && files.length > 0){
      const newArrayFiles = [...files];
      const filteredFiles = newArrayFiles.filter((currentfile) => currentfile.name !== file.name);
      if(filteredFiles.length > 0){
        setFiles(newArrayFiles.filter((currentfile) => currentfile.name !== file.name));
        form.setFieldValue(name, [ ...Array.from(newArrayFiles.filter((currentfile) => currentfile.name !== file.name))]);
      } else {
        setFiles(null);
        form.setFieldValue(name, null);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Очистка input, чтобы можно было загружать тот же файл
      }
    }else {
      setFiles(null);
    }
  }

  const renderFiles = (form: any) => {
    if(files && files.length > 0){
      return files.map((file) => (
        variant === 'photo' 
        ? 
          (
            <div key={file.name} className='relative flex text-sm items-center py-1.5 w-fit'>
              <img 
                src={URL.createObjectURL(file)} 
                className='h-[70px] w-[70px] rounded-lg' 
                alt="photo" 
              />
              <button 
                onClick={(event) => handleDeleteFile(event, file, form)} 
                className='absolute bg-white dark:bg-neutral-900 top-0 right-0 ml-1 p-1 border rounded-full'>
                  <IoMdClose/>
              </button>
            </div>
            
          )
        : 
          (
            <div key={file.name} className='flex text-sm items-center z-10'>
              <Link href={file.name as Route} target='_blank'>
                <p className="text-neutral-500" key={file.name}>{file.name}</p>  
              </Link>
              <button onClick={(event) => handleDeleteFile(event, file, form)} className='ml-1'><IoMdClose/></button>
            </div>
          )
      ))
    }else {
      return <p className="text-neutral-500">{translate('accountPartner.form.uploadDocuments.text')}</p>
    }
  }

  return (
    <fieldset className='relative'>
      {label && <span className={commonTitleClass}>{translate(label)}</span>}
      <Field name={name}>
        {({ form }: any) => (
          <>
            <label
              className="w-full py-2 px-4 flex border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-1150 justify-between items-center rounded-2xl border-input-file file-input-label cursor-pointer"
              htmlFor={name}
            >
              <div className="flex items-center gap-4">
                <DocumentTextIcon className='w-8 flex-shrink-0' />
                <div className="flex flex-col justify-beetwen">
                  <div className={`${variant === 'photo' ? "flex flex-wrap gap-2" : "flex flex-col gap-1"}`}>
                    {renderFiles(form)}
                  </div>
                  <p className="text-primary-1000 dark:text-primary-400 text-sm pt-2.5">{subTitle}</p>
                </div>
              </div>
            </label>
            <input 
              disabled={disabled}
              ref={fileInputRef}
              style={{ display: 'none' }}
              hidden
              type='file'
              id={name}
              name={name}
              accept={accept}
              multiple={multiple}
              className={commonClass}
              onChange={(event) => handleChange(event, form)}
            />
          </>
        )}
      </Field>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikInputSelectorProps {
  name: string;
  placeholder?: string;
  title?: string;
  error?: string;
  touched?: boolean;
  options: ICountries;
  rounded?: string;
  sizeClass?: string;
  disabled?: boolean; // Optional callback to handle adding new options
}

export const FormikInputSelector = ({
  name,
  placeholder,
  title,
  error,
  touched,
  rounded,
  sizeClass,
  options,
  disabled,
}: FormikInputSelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const translate = useTranslations();
  
  const { values, setFieldValue } = useFormikContext<any>();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsHighlighted(true);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <fieldset className='relative'>
      {title && <span className={commonTitleClass}>{translate(title)}</span>}
      <div className='relative' ref={dropDownRef} >
        <button
          disabled={disabled}
          type='button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`border text-md text-neutral-500 ${sizeClass} ${rounded} block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-1100 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-1150 rounded-2xl font-normal h-11 px-7 lg:text-lg py-3 text-left flex items-center justify-between`}
        >
          {values[name]?.name
            ? ( <p className='text-black dark:text-neutral-200'>{translate(values[name]?.name)}</p> ) 
            : translate(placeholder)
          }
          {isDropdownOpen ? <IoIosArrowUp/> : <IoIosArrowDown/> }
        </button>
        {isDropdownOpen && (
          <div className='absolute max-h-[350px] z-10 overflow-y-auto mt-1 w-full bg-white dark:bg-neutral-1150 border border-neutral-200 dark:border-neutral-1100 rounded-2xl shadow-lg'>
            <div className='py-2 px-2'>
              <div className='flex items-center w-full border border-neutral-200 dark:border-neutral-1100 rounded-lg px-2 py-1'>
                <input
                  type='text'
                  className='w-full dark:bg-neutral-1150 focus:ring-0 focus-visible:outline-none border-none p-0'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <HiOutlineSearch/>
              </div>
            </div>
            <ul>
              {filteredOptions.map((option) => (
                <li
                  onMouseEnter={() => setIsHighlighted(false)}
                  key={option.id}
                  className={`py-1 px-3 dark:hover:text-black ${(isHighlighted && option.id === values[name]?.id) ? 'dark:text-black dark:bg-neutral-300 bg-neutral-100' : ''} hover:bg-neutral-100 dark:hover:bg-neutral-1100 cursor-pointer`}
                  onClick={() => {
                    setFieldValue(name, option);
                    setIsHighlighted(true);
                    setIsDropdownOpen(false);
                    setInputValue('');
                  }}
                >
                  {translate(option.name)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};

interface FormikInputSelectorCarProps {
  name: string;
  placeholder?: string;
  title?: string;
  error?: string;
  touched?: boolean;
  rounded?: string;
  sizeClass?: string;
  options: IModels;
  disabled?: boolean;
}

export const FormikInputCarSelector = ({
  name,
  placeholder,
  title,
  error,
  touched,
  rounded,
  sizeClass,
  options,
  disabled = false
}: FormikInputSelectorCarProps) => {
  const translate = useTranslations();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { values, setFieldValue } = useFormikContext<any>();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.model_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsHighlighted(true);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <fieldset className='relative'>
      {title && <span className={commonTitleClass}>{translate(title)}</span>}
      <div className='relative' ref={dropDownRef}>
        <button
          disabled={disabled}
          type='button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`border text-md text-neutral-500 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl font-normal h-11 px-4 py-3 text-left flex items-center justify-between`}
        >
          {values[name]?.brand_name.length > 0 
            ? ( <p className='text-black dark:text-neutral-200'>{`[${values[name]?.brand_name}] ${values[name]?.model_name}`}</p> ) 
            : translate(placeholder)
          }
          {isDropdownOpen ? <IoIosArrowUp/> : <IoIosArrowDown/> }
        </button>
        {isDropdownOpen && (
          <div className='absolute max-h-[600px] overflow-y-auto z-10 mt-1 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg'>
            <div className='py-2 px-2'>
              <div className='flex items-center w-full border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1'>
                <input
                  type='text'
                  className='w-full dark:bg-neutral-900 focus:ring-0 focus-visible:outline-none border-none p-0'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <HiOutlineSearch/>
              </div>
            </div>
            <ul>
              {filteredOptions.map((option) => (
                <li
                  onMouseEnter={() => setIsHighlighted(false)}
                  key={option.id}
                  className={`py-1 px-3 dark:hover:text-black ${(isHighlighted && option.id === values[name]?.id) ? 'dark:text-black dark:bg-neutral-300 bg-neutral-100' : ''} hover:bg-neutral-100 dark:hover:bg-neutral-300 cursor-pointer`}
                  onClick={() => {
                    setFieldValue(name, option);
                    setIsHighlighted(true);
                    setIsDropdownOpen(!isDropdownOpen);
                    setInputValue('');
                  }}
                >
                  {`[${option.brand_name}] ${option.model_name}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && touched ? (
        <div className={commonErrorClass}>
          <InformationCircleIcon className='w-4 inline-block mr-1' />
          {translate(error)}
        </div>
      ) : null}
    </fieldset>
  );
};