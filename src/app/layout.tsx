import { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import LoadingProgressBar from '@/components/LoadingProgressBar';
import Header from '../components/header/Header';
import Footer from '@/components/Footer';
import CookieAlert from '@/components/CookieAlert';

import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import './globals.css';
import '@/styles/index.scss';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title:
    'Elite Car Sales & Global Delivery | Luxury Vehicles Worldwide | WeltCar',
  description:
    'Discover our collection of elite cars with global delivery to all countries, including Germany, Switzerland, Dubai, and China. Experience luxury and performance with our exclusive vehicle range.',
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
    <html lang='en' className={poppins.className} suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "o5v1ijna7p");
            `,
          }}
        />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
          />
      </head>
      <body className='pt-16 md:pt-20 flex flex-col min-h-screen text-base bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <LoadingProgressBar />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <main className='flex-grow overflow-hidden'>{children}</main>
          <Footer />
          <CookieAlert />
        </ThemeProvider>
      </body>
    </html>
  );
}
