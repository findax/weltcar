import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server"
import { getLanguages, getLanguagesTranslations } from "./api/languages";

export default getRequestConfig(async ({ locale }) => {
    const localesRes = await getLanguages()

    let locales = localesRes ? localesRes.data.map(el => el.locale) : ['en', 'de']
    
    if (!locales.includes(locale)) notFound()

    let translations: any = null

    translations = await getLanguagesTranslations(locale)

    if (!translations) {
        try {
            translations = (await import(`/messages/${locale}.json`)).default
        } catch (err) {
            console.error(`Fallback translation load failed for ${locale}`);
            translations = {};
        }
    }

    return {
        messages: translations
    }
})