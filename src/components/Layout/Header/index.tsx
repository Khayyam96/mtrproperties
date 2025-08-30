"use client";

import "@/i18n";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { CloseOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Drawer, Space } from "antd";
import type { MenuProps } from "antd";
import "./index.scss";

type NavChild = { key: string; label: string; href: string };
type NavItem = { key: string; label: React.ReactNode; href?: string; children?: NavChild[] };

const LANGS = [
  { key: "en", label: "EN", flag: "/uk.png" },
  { key: "ar", label: "AR", flag: "/ar.png" },
  { key: "ru", label: "RU", flag: "/ru.png" },
  { key: "de", label: "DE", flag: "/de.png" },
  { key: "es", label: "ES", flag: "/es.png" },
  { key: "fr", label: "FR", flag: "/fr.png" },
];

const renderDesktopNav = (items: NavItem[]) => (
  <ul className="main-nav">
    {items.map((item) =>
      item.children ? (
        <li key={item.key}>
          <Dropdown
            menu={{
              items: item.children.map(({ key, label, href }) => ({
                key,
                label: <Link href={href}>{label}</Link>,
              })),
            }}
          >
            <a>{item.label}</a>
          </Dropdown>
        </li>
      ) : (
        <li key={item.key}>
          <Link href={item.href!}>{item.label}</Link>
        </li>
      )
    )}
  </ul>
);

export default function MainHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const currentLangObj = LANGS.find((l) => l.key === currentLang) || LANGS[0];

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = currentLang;
  }, [currentLang]);

  const languageMenuItems: MenuProps["items"] = LANGS.map((l) => ({
    key: l.key,
    label: (
      <span className="lang-item" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <Image src={l.flag} alt={`${l.label} flag`} width={20} height={14} />
        {l.label}
      </span>
    ),
  }));

  const onLanguageClick: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(String(key));
    setOpen(false);
  };

  const navItems = useMemo<NavItem[]>(
    () => [
      { key: "buy", label: <Space>{t("nav.buy")}</Space>, href: "/buy" },
      { key: "rent", label: <Space>{t("nav.rent")}</Space>, href: "/rent" },
      { key: "projects", label: <Space>{t("nav.newProjects")}</Space>, href: "/projects" },
      { key: "areas", label: <Space>{t("nav.areas")}</Space>, href: "/areas" },
      {
        key: "services",
        label: <Space>{t("nav.services")}</Space>,
        children: [
          { key: "consulting", label: t("nav.consulting"), href: "/services/consulting" },
          { key: "mortgage", label: t("nav.mortgage"), href: "/services/mortgage" },
        ],
      },
      {
        key: "explore",
        label: <Space>{t("nav.exploreMore")}</Space>,
        children: [
          { key: "about", label: t("nav.about"), href: "/about" },
          { key: "blog", label: t("nav.blog"), href: "/blog" },
        ],
      },
    ],
    [t]
  );

  // Dizayndakı kimi: Services bağlı, Explore More açıq
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    services: false,
    explore: true,
  });
  const toggleGroup = (key: string) => setOpenGroups((s) => ({ ...s, [key]: !s[key] }));

  const getItemText = (item: NavItem): string => {
    if (typeof item.label === "string") return item.label;
    return t(`nav.${item.key}` as any);
  };

  const renderMobileNav = (items: NavItem[]) => {
    const collapsibleKeys = new Set(["services", "explore"]);
    return (
      <ul className="mobile-nav">
        {items.map((item) => {
          const isCollapsible = !!item.children && collapsibleKeys.has(item.key);
          if (!isCollapsible) {
            return (
              <li key={item.key} className="mobile-item">
                <Link href={item.href || "#"} onClick={() => setOpen(false)}>
                  <span className="mobile-text">{getItemText(item)}</span>
                </Link>
              </li>
            );
          }
          const isOpen = !!openGroups[item.key];
          return (
            <li key={item.key} className={`mobile-item has-children ${isOpen ? "open" : ""}`}>
              <button className="mobile-item-head" onClick={() => toggleGroup(item.key)}>
                <span>{t(`nav.${item.key}`)}</span>
                <DownOutlined className="chevron" />
              </button>

              {isOpen && (
                <div className="mobile-sublist">
                  {item.children!.map((c, idx) => (
                    <Link
                      key={c.key}
                      href={c.href}
                      className={`mobile-subitem ${idx === 0 && item.key === "explore" ? "is-active" : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      <span>{c.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="main-header">
      <div className="topbar">
        <div className="left">
          <span>
            <Image src="/phoneicon.png" alt="Phone" width={16} height={16} />
            <p>04 331 7007</p>
          </span>
          <span>
            <Image src="/mailicon.png" alt="Email" width={16} height={16} />
            <p>contact@mtr.ae</p>
          </span>
          <span>
            <Image src="/whsappicon.png" alt="WhatsApp" width={16} height={16} />
            <p>+971 56 933 2607</p>
          </span>
        </div>

        <div className="right">
          <Dropdown menu={{ items: [{ key: "aed", label: "AED" }, { key: "usd", label: "USD" }, { key: "eur", label: "EUR" }] }}>
            <a className="dropdown-link">
              AED <Image src="/arrowup.png" className="lang-icon" alt="Arrow" width={20} height={14} />
            </a>
          </Dropdown>

          <Dropdown menu={{ items: languageMenuItems, onClick: onLanguageClick }}>
            <a className="dropdown-link">
              <Image className="flag-icon" src={currentLangObj.flag} alt={currentLangObj.label} width={20} height={14} />
              {currentLangObj.label}
              <Image className="lang-icon" src="/arrowup.png" alt="Arrow" width={10} height={10} />
            </a>
          </Dropdown>
        </div>
      </div>

      <div className="container nav-container">
        <Link href="/" className="logo">
          <div className="logo-img-wrapper">
            <Image src="/logo.png" alt="MTR Properties" fill priority />
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <nav className="desktop-nav">{renderDesktopNav(navItems)}</nav>

          <div className="actions">
            <Button type="primary" className="whatsapp-btn">
              <Image src="/whsappicon.png" alt="" width={18} height={18} />
              Whatsapp
            </Button>
            <Button type="text" className="burger" icon={<MenuOutlined />} onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* SOLDAN açılan drawer – dizayndakı kimi */}
      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        width="100%"
        closeIcon={<CloseOutlined />}
        styles={{ body: { padding: 0 } }}
      >
        <div className="drawer-content">
          <div className="drawer-head">
            <div className="drawer-logo">
              <Image src="/logo.png" alt="MTR Properties" fill />
            </div>
          </div>

          {renderMobileNav(navItems)}

          <div className="drawer-footer">
            <Button type="primary" block className="contact-btn--mobile">
              <Image src="/whsappicon.png" alt="" width={18} height={18} />
              Whatsapp
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
