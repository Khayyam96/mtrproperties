// src/i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const RTL_LANGS = new Set(["ar"]);

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "ar", "ru", "de", "es", "fr"],
      interpolation: { escapeValue: false },
      backend: { loadPath: "/locales/{{lng}}/translation.json" },
      detection: {
        order: ["localStorage", "htmlTag", "cookie"],
        caches: ["localStorage"],
      },
      react: { useSuspense: false },
    });

  const applyDir = (lng: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
      document.documentElement.dir = RTL_LANGS.has(lng) ? "rtl" : "ltr";
    }
  };

  i18n.on("initialized", () => {
    applyDir(i18n.resolvedLanguage || i18n.language || "en");
  });

  i18n.on("languageChanged", (lng) => applyDir(lng));
}

export default i18n;
