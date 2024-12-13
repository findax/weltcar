import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"
import { getLanguages } from "./api/languages"

export default async function middleware(req: NextRequest) {
    const localesRes = await getLanguages()

    let locales = ['en', 'de']
    let defaultLocale = 'en'

    if (localesRes) {
        locales = localesRes.data.map(el => el.locale)
        defaultLocale = localesRes.fallback.locale
    }

    const intlMiddleware = createMiddleware({
        locales: locales,
        defaultLocale: defaultLocale
    });

    return intlMiddleware(req);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}