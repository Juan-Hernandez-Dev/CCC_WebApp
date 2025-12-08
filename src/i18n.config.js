

import i18next from 'i18next';
import global_es from "./translations/es/globalesp.json";
import global_en from "./translations/en/globaleng.json";

export const i18nConfig = {
    interpolation: { escapeValue: false },
    lng: "es", 
    resources: {
        es: {
            global: global_es,
        },
        en: {
            global: global_en,
        },
    },
};

export default i18nConfig;