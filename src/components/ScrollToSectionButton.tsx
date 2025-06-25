'use client';

import ThemedImage from '@/shared/ThemedImage';
import arrowDownLightImg from '@/images/bg-figures/arrow-down.svg';
import arrowDownDarkImg from '@/images/bg-figures/arrow-down-dark.svg';

const ScrollToSection = ({ targetId }: { targetId: string }) => {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - 100;

    slowScrollTo(targetPosition, 1300);
  };

  const slowScrollTo = (targetY: number, duration: number) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = Date.now();

    const scrollStep = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      window.scrollTo(0, startY + distance * progress);

      if (progress < 1) {
        setTimeout(scrollStep, 10);
      }
    };

    scrollStep();
  };

  return (
    <div onClick={scrollToSection}>
      {/* <Image
          className='w-8 h-7 mx-auto cursor-pointer animate-pulse'
          alt='arrow down image'
          src={isDarkMode ? arrowDownLightImg : arrowDownDarkImg}
        /> */}
      <ThemedImage
        alt='arrow down image'
        lightSrc={arrowDownDarkImg}
        darkSrc={arrowDownLightImg}
        className='w-8 h-7 mx-auto cursor-pointer animate-pulse'
      />
    </div>
  );
};

export default ScrollToSection;
