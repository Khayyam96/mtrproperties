"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const RTL_LANGS = new Set(["ar"]);
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function applyDir(lng: string) {
  if (typeof document !== "undefined") {
    const short = lng.split("-")[0]; 
    document.documentElement.lang = short;
    document.documentElement.dir = RTL_LANGS.has(short) ? "rtl" : "ltr";
  }
}

function persistCookie(lng: string) {
  if (typeof document !== "undefined") {
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  }
}

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "ar", "ru", "de", "es", "fr"],
      nonExplicitSupportedLngs: true, 
      load: "languageOnly", 

      ns: ["common"],
      defaultNS: "common",

      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },

      detection: {
        order: ["cookie", "localStorage", "htmlTag", "navigator"],
        lookupCookie: "NEXT_LOCALE", 
        caches: ["cookie", "localStorage"], 
        cookieMinutes: ONE_YEAR_SECONDS / 60, 
      },

      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      returnEmptyString: false,
    });

  i18n.on("initialized", () => {
    const lng = i18n.resolvedLanguage || i18n.language || "en";
    applyDir(lng);
  });

  i18n.on("languageChanged", (lng) => {
    applyDir(lng);
    persistCookie(lng);
  });
}

export default i18n;
