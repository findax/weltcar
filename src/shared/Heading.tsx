import { HTMLAttributes, ReactNode } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc,
  className,
  isCenter = false,
  fontClass,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50 ${isCenter ? 'text-center w-full max-w-2xl mx-auto mb-4' : 'max-w-2xl'} ${className}`}
    >
      <h2
        className={`text-3xl md:text-4xl font-semibold ${fontClass}`}
        {...args}
      >
        {children || `Section Heading`}
      </h2>
      {desc && (
        <span className='block mt-4 md:mt-6 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400'>
          {desc}
        </span>
      )}
    </div>
  );
};

export default Heading;
