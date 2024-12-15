'use client';

import LoadingSpinner from '@/shared/LoadingSpinner';
import { SupportData } from '@/types/support';
import { useEffect, useState } from 'react';

interface IProps {
  technicalData: SupportData
}

const TechnicalDetails = ({ technicalData }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [supportData, setSupportData] = useState({} as SupportData);

  useEffect(() => {
    if(technicalData) {
      setSupportData(technicalData)
      setIsLoading(false);
    }
  },[technicalData])

  return isLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='flex justify-center w-full my-12 xl:my-20'>
        <div className='w-[860px]'>
          <h1 className='text-3xl lg:text-4xl text-neutral-1050 dark:text-white font-semibold leading-10'>
            {supportData.title}
          </h1>
        </div>
      </div>
      <div className='flex justify-center w-full my-12 xl:my-20'>
        <div className='w-[860px]'>
          <div
            className='markdown-blog-styles'
            dangerouslySetInnerHTML={{ __html: supportData.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetails;
