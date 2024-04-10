import { Poppins } from 'next/font/google';
import Header from './(client-components)/(Header)/Header';
import ClientCommons from './ClientCommons';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/components/Footer';
import NavbarMobile from '@/components/NavbarMobile';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='bg-neutral-100 text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
        <ClientCommons />
        <Header />
        {children}
        <NavbarMobile />
        <Footer />
      </body>
    </html>
  );
}
