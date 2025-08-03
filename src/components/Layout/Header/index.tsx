"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";
import {
  DownOutlined,
  MenuOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Drawer, Space } from "antd";
import type { MenuProps } from "antd";
import "./index.scss";

const navItems = [
  {
    key: "buy",
    label: (
      <Space>
        Buy
      </Space>
    ),
    href: "/buy",
  },
  {
    key: "rent",
    label: (
      <Space>
        Rent
      </Space>
    ),
    href: "/rent",
  },
  {
    key: "projects",
    label: (
      <Space>
        New Projects
      </Space>
    ),
    href: "/projects",
  },
  {
    key: "areas",
    label: (
      <Space>
        Areas
        <Image src="/blackup.png" alt="Areas" width={16} height={16} />
      </Space>
    ),
    children: [
      { key: "dubai", label: "Dubai", href: "/areas/dubai" },
      { key: "abu", label: "Abu Dhabi", href: "/areas/abu-dhabi" },
    ],
  },
  {
    key: "services",
    label: (
      <Space>
        Our Services
        <Image src="/blackup.png" alt="Areas" width={16} height={16} />      </Space>
    ),
    children: [
      { key: "consulting", label: "Consulting", href: "/services/consulting" },
      { key: "mortgage", label: "Mortgage", href: "/services/mortgage" },
    ],
  },
  {
    key: "explore",
    label: (
      <Space>
        Explore More
        <Image src="/blackup.png" alt="Areas" width={16} height={16} />
      </Space>
    ),
    children: [
      { key: "blog", label: "Blog", href: "/blog" },
      { key: "faq", label: "FAQ", href: "/faq" },
    ],
  },
];

const currencyMenu: MenuProps["items"] = [
  { key: "aed", label: "AED" },
  { key: "usd", label: "USD" },
  { key: "eur", label: "EUR" },
];

const languageMenu: MenuProps["items"] = [
  { key: "en", label: "EN" },
  { key: "ar", label: "AR" },
  { key: "ru", label: "RU" },
];

const renderNav = (items: typeof navItems) => (
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
          <Link href={item.href}>{item.label}</Link>
        </li>
      )
    )}
  </ul>
);

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="main-header">
      <div className="topbar">
        <div className="left">
          <span>
            <Image src="/phoneicon.png" alt="Phone" width={16} height={16} />
            04 331 7007
          </span>
          <span>
            <Image src="/mailicon.png" alt="Email" width={16} height={16} />
            contact@mtr.ae
          </span>
          <span>
            <Image src="/whsappicon.png" alt="WhatsApp" width={16} height={16} />
            +971 56 933 2607
          </span>
        </div>

        <div className="right">
          <Dropdown menu={{ items: currencyMenu }}>
            <a className="dropdown-link">
              AED <Image
                src="/arrowup.png"
                className="lang-icon"
                alt="English"
                width={20}
                height={14}
              />
            </a>
          </Dropdown>

          <Dropdown menu={{ items: languageMenu }}>
            <a className="dropdown-link">
              <Image
                className="flag-icon"
                src="/uk.png"
                alt="English"
                width={20}
                height={14}
              />
              EN
              <Image
                className="lang-icon"
                src="/arrowup.png"
                alt="Arrow"
                width={10}
                height={10}
              />
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
          <nav className="desktop-nav">{renderNav(navItems)}</nav>

          <div className="actions">
            <Button type="primary" className="whatsapp-btn" icon={<WhatsAppOutlined />}>
              Whatsapp
            </Button>
            <Button
              type="text"
              className="burger"
              icon={<MenuOutlined />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        width={260}
        styles={{ body: { padding: 0 } }}
        closeIcon={<CloseOutlined />}
      >
        <div className="drawer-content">
          {renderNav(navItems)}
          <Button
            type="primary"
            icon={<WhatsAppOutlined />}
            block
            className="contact-btn--mobile"
          >
            Whatsapp
          </Button>
          <Dropdown menu={{ items: languageMenu }}>
            <a className="lang-switch">
              EN <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Drawer>
    </div>
  );
}
