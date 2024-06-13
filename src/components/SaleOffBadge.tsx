import React, { FC } from 'react';

export interface SaleOffBadgeProps {
  className?: string;
  desc?: string;
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = 'text-xs py-0.5 px-3 bg-red-700 text-red-50 rounded-full',
  desc = '-10% today',
}) => {
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center ${className}`}
      data-nc-id='SaleOffBadge'
    >
      {desc}
    </div>
  );
};

export default SaleOffBadge;
