import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.js'
import te from './locales/te.js'

// Locale used for dates in each language
export const DATE_LOCALES = { en: 'en-GB', te: 'te-IN' }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, te: { translation: te } },
    supportedLngs: ['en', 'te'],
    nonExplicitSupportedLngs: true, // "te-IN" → "te"
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      // ?lng=te in the link, then the guest's last choice, then their browser language
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },
  })

const syncHtmlLang = (lng) => document.documentElement.setAttribute('lang', lng.startsWith('te') ? 'te' : 'en')
syncHtmlLang(i18n.resolvedLanguage || 'en')
i18n.on('languageChanged', syncHtmlLang)

export default i18n
