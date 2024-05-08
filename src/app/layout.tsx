import { Poppins } from 'next/font/google';
import LoadingProgressBar from '@/components/LoadingProgressBar';
import Header from '../components/header/Header';
import Footer from '@/components/Footer';
import { Metadata, Viewport } from 'next';

import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'WeltCar - Premium Automobiles',
  description:
    'Explore our curated selection of premium automobiles, where every ride embodies elegance and sophistication',
  keywords: 'Cars, Vehicles, Automobiles',
};

export const viewport: Viewport = {
  themeColor: 'white',
  // width: 'device-width',
  // initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='pt-20 bg-neutral-100 text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
        <LoadingProgressBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
