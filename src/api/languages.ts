import { transformTranslations } from '@/utils/transformTranslations';
import { toast } from 'react-toastify';
import api from './apiInstance';

type Languages = { data: [ { locale: string, name: string } ], fallback: { locale: string, name: string } }

type TranslationMessages = Record<string, string>;

export const getLanguages = async (): Promise<Languages | false> => {
  return new Promise((resolve) => {
    api
      .get('api/languages')
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response?.data.message) {
          console.log(err.response.data.message);
        } else {
          console.log('Something went wrong!');
        }
        resolve(false);
      });
  });
};

export const getLanguagesTranslations = async (locale: string) => {
  return new Promise(async (resolve) => {
    try {
      const headers: Record<string, string> = {
        'Accept-Language': locale,
      };

      const res = await api.get('api/languages/translations', { headers });

      if (res.status === 200) {
        const translations = res.data;

        let tr = transformTranslations(translations)

        resolve(tr);
      } else {
        resolve(null);
      }
    } catch (err: any) {
      if (err.response?.data.message) {
        console.log(err.response.data.message);
      } else {
        console.log('Something went wrong!');
      }
      resolve(false);
    }
  });
};
