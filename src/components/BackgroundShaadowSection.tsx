import React, { FC } from 'react';

export interface IProps {
  className?: string;
}

const BackgroundShaadowSection: FC<IProps> = ({
  className,
}) => {
  return (
    <div
      className={`absolute blur-[200px] w-[627px] h-[627px] z-[-1000] opacity-[0.22] rounded-full ${className}`}/>
  );
};

export default BackgroundShaadowSection;
