// app/providers.tsx
"use client";
import { I18nextProvider } from "react-i18next";
import ensureI18n from "@/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  const i18n = ensureI18n;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
