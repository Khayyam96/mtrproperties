// src/components/ClientAntdProvider.tsx
"use client";

import { PropsWithChildren, useMemo } from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

const RTL_LANGS = new Set(["ar"]);

export default function ClientAntdProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const direction = RTL_LANGS.has(lng) ? "rtl" : "ltr";

  const theme = useMemo(
    () => ({
      token: { colorPrimary: "#19273d" },
    }),
    []
  );

  return (
    <ConfigProvider direction={direction} theme={theme}>
      {children}
    </ConfigProvider>
  );
}
