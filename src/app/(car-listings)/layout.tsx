import BgGlassmorphism from '@/components/BgGlassmorphism';
import React, { ReactNode } from 'react';
import SectionHeroArchivePage from '../(server-components)/SectionHero';
import heroRightImage from '@/images/hero-right-car.png';
import BackgroundSection from '@/components/BackgroundSection';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='relative overflow-hidden'>{children}</div>;
};

export default Layout;
