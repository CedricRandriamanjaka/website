import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationData from './locales/content.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: translationData.fr
      },
      en: {
        translation: translationData.en
      }
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de repli
    interpolation: {
      escapeValue: false, // React se charge déjà de l’échappement
    }
  });

export default i18n;
