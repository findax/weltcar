'use client';

import Heading from '@/shared/Heading';
import React, { FC, useState } from 'react';
import clientSay1 from '@/images/avatars/Image-2.png';
import clientSay2 from '@/images/avatars/Image-3.png';
import clientSay3 from '@/images/avatars/Image-4.png';
import quotationImg from '@/images/quotation.png';
import quotationImg2 from '@/images/quotation2.png';
import {
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { variants } from '@/utils/animationVariants';
import bgImg from '@/images/bg-cars/Urus_Performante.png';

export interface SectionClientSayProps {
  className?: string;
  data?: typeof DEMO_DATA;
}

const DEMO_DATA = [
  {
    id: 1,
    avatar: clientSay1,
    clientName: 'Tiana Abie',
    clientAddress: 'Munich',
    content:
      'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
  },
  {
    id: 2,
    avatar: clientSay2,
    clientName: 'Lennie Swiffan',
    clientAddress: 'Hamburg',
    content:
      'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
  },
  {
    id: 3,
    avatar: clientSay3,
    clientName: 'Berta Emili',
    clientAddress: 'Berlin',
    content:
      'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({
  className = '',
  data = DEMO_DATA,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  let currentItem = data[index];

  function changeItemId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < data?.length - 1) {
        changeItemId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeItemId(index - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <div className={`nc-SectionClientSay relative ${className}`}>
      <Heading
        desc="Let's see what people think of WeltCar"
        isCenter
        fontClass='!font-bold xl:text-5xl'
      >
        Good news from far away
      </Heading>
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 200, damping: 30 },
          opacity: { duration: 0.5 },
        }}
      >
        <div
          className={`mt-12 lg:mt-16 max-w-4xl mx-auto whitespace-nowrap overflow-hidden`}
          {...handlers}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants(500, 0)}
              initial='enter'
              animate='center'
              // exit="exit"
              className='relative sm:px-20 inline-flex flex-col items-center text-center whitespace-normal'
            >
              <Image
                className='w-28 mx-auto mb-8 rounded-full'
                src={currentItem.avatar}
                alt='avatar'
              />

              <Image
                className='hidden lg:block mt-4 absolute left-0 top-1/2 -translate-y-1/2'
                src={quotationImg}
                alt='quotation'
              />
              <Image
                className='hidden lg:block mt-4 absolute right-0 top-1/2 -translate-y-1/2'
                src={quotationImg2}
                alt='quotation'
              />

              <span className='block text-2xl'>{currentItem.content}</span>
              <span className='block mt-8 text-2xl font-semibold'>
                {currentItem.clientName}
              </span>
              <div className='flex items-center space-x-2 text-lg mt-2 text-neutral-400'>
                <MapPinIcon className='h-5 w-5' />
                <span>{currentItem.clientAddress}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className='mt-10 flex items-center justify-center space-x-3'>
            <button
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-primary-600 focus:outline-none ${index === 0 ? '!bg-primary-400 dark:!bg-primary-900' : 'cursor-pointer hover:bg-primary-700'}`}
              style={{ transform: 'translate3d(0, 0, 0)' }}
              onClick={() => changeItemId(index - 1)}
              disabled={index === 0}
            >
              <ChevronLeftIcon className='w-6 mr-0.5' color='white' />
            </button>

            <button
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-primary-600 focus:outline-none ${index === data.length - 1 ? '!bg-primary-400 dark:!bg-primary-900' : 'cursor-pointer hover:bg-primary-700'}`}
              style={{ transform: 'translate3d(0, 0, 0)' }}
              onClick={() => changeItemId(index + 1)}
              disabled={index === data.length - 1}
            >
              <ChevronRightIcon className='w-6 ml-0.5' color='white' />
            </button>
          </div>
        </div>
      </MotionConfig>
      <Image
        className='hidden sm:block absolute inset-0 top-20 object-contain w-full opacity-[0.1] dark:opacity-[0.08] -z-10'
        src={bgImg}
        alt='premium logo'
        priority
      />
    </div>
  );
};

export default SectionClientSay;
