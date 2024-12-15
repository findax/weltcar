import { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import LoadingProgressBar from '@/components/LoadingProgressBar';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import CookieAlert from '@/components/CookieAlert';
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={params.locale} className={poppins.className} suppressHydrationWarning>
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
          {/* Favicon */}
          <link rel="icon" href="/img/favicon.ico" />
          {/* Additional Favicons */}
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
          <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
          <link rel="manifest" href="/img/site.webmanifest" />
          {/* Android Chrome */}
          <link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/img/android-chrome-512x512.png" />
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
    </NextIntlClientProvider>
  );
}
