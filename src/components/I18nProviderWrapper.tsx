// src/components/I18nProviderWrapper.tsx

'use client';

import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from "../i18n.config";

if (!i18next.isInitialized) {
    i18next
      .use(initReactI18next)
      .init(i18nConfig)
      .catch((err) => {
        console.error('i18next init error:', err);
      });
}

export default function I18nProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    // La configuración 'i18n' es pasada al proveedor
    return (
        <I18nextProvider i18n={i18next}>
            {children}
        </I18nextProvider>
    );
}