import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { getLanguages } from './api/languages';

let cacheTimestamp = 0; // Store the last update time
const CACHE_TTL = 1 * 60 * 1000; // 1 minute in milliseconds

let cachedLocales: string[] | null = null; // Cache for locales
let cachedDefaultLocale: string | null = null; // Cache for default locale

async function fetchLocaleData() {
  const now = Date.now();
  
  // Check if the cache is expired
  if (!cachedLocales || !cachedDefaultLocale || now - cacheTimestamp > CACHE_TTL) {
    console.log('Refreshing cache...');
    const localesRes = await getLanguages();

    if (localesRes) {
      cachedLocales = localesRes.data.map((el) => el.locale);
      cachedDefaultLocale = localesRes.fallback.locale;
      cacheTimestamp = now; // Update the timestamp
    } else {
      cachedLocales = ['en', 'de'];
      cachedDefaultLocale = 'en';
      cacheTimestamp = now; // Update the timestamp even if fallback is used
    }
  } else {
    console.log('Using cached data...');
  }

  return { locales: cachedLocales, defaultLocale: cachedDefaultLocale };
}



export default async function middleware(req: NextRequest) {
  const { locales, defaultLocale } = await fetchLocaleData();

  const intlMiddleware = createMiddleware({
    locales: locales!,
    defaultLocale: defaultLocale!,
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images).*)'],
};
