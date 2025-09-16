// src/i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const RTL_LANGS = new Set(["ar"]);
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function applyDir(lng: string) {
  if (typeof document !== "undefined") {
    const short = lng.split("-")[0]; // en-US -> en
    document.documentElement.lang = short;
    document.documentElement.dir = RTL_LANGS.has(short) ? "rtl" : "ltr";
  }
}

function persistCookie(lng: string) {
  if (typeof document !== "undefined") {
    // next-i18next və SSR uyğunluğu üçün
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  }
}

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // Əsas dillər
      fallbackLng: "en",
      supportedLngs: ["en", "ar", "ru", "de", "es", "fr"],
      nonExplicitSupportedLngs: true, // en-US -> en
      load: "languageOnly", // yalnız qısa kodları saxla (en, ar...)

      // Namespacelər
      ns: ["common"],
      defaultNS: "common",

      // JSON fayllarının yolu
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },

      // Dil aşkar etmə və yadda saxlama
      detection: {
        order: ["cookie", "localStorage", "htmlTag", "navigator"],
        lookupCookie: "NEXT_LOCALE", // cookie adı
        caches: ["cookie", "localStorage"], // dili həm cookie, həm də localStorage-da saxla
        cookieMinutes: ONE_YEAR_SECONDS / 60, // i18next-də dəqiqə ilə istəyir
      },

      interpolation: { escapeValue: false },
      react: { useSuspense: false },

      // Boş stringlərdə fallback etsin
      returnEmptyString: false,
    });

  // İlk init zamanı lang/dir tətbiq et
  i18n.on("initialized", () => {
    const lng = i18n.resolvedLanguage || i18n.language || "en";
    applyDir(lng);
  });

  // Dil dəyişəndə həm dir/lang, həm cookie yenilənir
  i18n.on("languageChanged", (lng) => {
    applyDir(lng);
    persistCookie(lng);
  });
}

export default i18n;
