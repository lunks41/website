const i18n = require('i18next');
import { initReactI18next } from 'react-i18next';

import languageEN from './locales/en/common.json';
import languageAR from './locales/ar/common.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: languageEN,
            ar: languageAR,
        },
        lng: "en",
        fallbackLng: "en",
        debug: false,
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
        react: {
            wait: true,
            bindI18n: "languageChanged loaded",
            bindStore: "added removed",
            nsMode: "default",
        },
    });

export default i18n;