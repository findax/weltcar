import { Poppins } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import LoadingProgressBar from '@/components/LoadingProgressBar';
import Header from '../components/header/Header';
import Footer from '@/components/Footer';
import CookieAlert from '@/components/CookieAlert';
import { Metadata, Viewport } from 'next';

import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import '@/styles/index.scss';

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
      <body className='pt-16 md:pt-20 bg-neutral-100 text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <LoadingProgressBar />
        <Header />
        {children}
        <Footer />
        <CookieAlert />
      </body>
    </html>
  );
}
