'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { Route } from '@/types/routers';
import LoadingSpinner from './LoadingSpinner';
import { XMarkIcon } from '@heroicons/react/24/solid';
import twFocusClass from '@/utils/twFocusClass';

interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: Route<string>;
  targetBlank?: boolean;
  onClick?: () => void;
  download?: boolean;
  children?: ReactNode;
}

export const Button = ({
  className = 'text-neutral-700 dark:text-neutral-200',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  download,
  onClick = () => {},
}: ButtonProps) => {
  const CLASSES = `nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${translate} ${className} `;

  if (!!href) {
    return (
      <Link
        href={href}
        target={targetBlank ? '_blank' : undefined}
        download={download}
        className={`${CLASSES} `}
        onClick={onClick}
        rel={targetBlank ? 'noopener noreferrer' : undefined}
      >
        {children || `This is Link`}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && <LoadingSpinner />}
      {children || `This is Button`}
    </button>
  );
};

export const ButtonPrimary = ({ className = '', ...args }: ButtonProps) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-600 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export const ButtonSecondary = ({ className = ' ', ...args }: ButtonProps) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${className}`}
      {...args}
    />
  );
};

export const ButtonThird = ({
  className = 'text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700',
  ...args
}: ButtonProps) => {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />;
};

interface ButtonCircleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

export const ButtonCircle = ({
  className = ' ',
  size = 'w-9 h-9 ',
  ...args
}: ButtonCircleProps) => {
  return (
    <button
      className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-primary-600 hover:bg-primary-700 text-neutral-50 ${className} ${size} `}
      {...args}
    />
  );
};

interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
}

export const ButtonClose = ({
  className = '',
  onClick = () => {},
}: ButtonCloseProps) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className='sr-only'>Close</span>
      <XMarkIcon className='w-5 h-5' />
    </button>
  );
};
