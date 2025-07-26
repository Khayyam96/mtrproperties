"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MenuOutlined,
  DownOutlined,
  PhoneOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, type MenuProps, Space } from "antd";
import "./index.scss";


interface SimpleItem {
  key: string;
  label: ReactNode;
  href: string;
}

interface NestedItem {
  key: string;
  label: ReactNode;
  children: SimpleItem[];
}

type NavItem = SimpleItem | NestedItem;


const navItems: NavItem[] = [
  { key: "buy", label: "Buy", href: "/buy" },
  { key: "rent", label: "Rent", href: "/rent" },
  { key: "new", label: "New Projects", href: "/projects" },
  {
    key: "areas",
    label: (
      <Space>
        Areas <DownOutlined />
      </Space>
    ),
    children: [
      { key: "dubai", label: "Dubai", href: "/areas/dubai" },
      { key: "abu-dhabi", label: "Abu Dhabi", href: "/areas/abu-dhabi" },
    ],
  },
  {
    key: "services",
    label: (
      <Space>
        Our Services <DownOutlined />
      </Space>
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
        Explore More <DownOutlined />
      </Space>
    ),
    children: [
      { key: "blog", label: "Blog", href: "/blog" },
      { key: "faq", label: "FAQ", href: "/faq" },
    ],
  },
];

const languageMenu: MenuProps["items"] = [
  { key: "en", label: "EN" },
  { key: "ar", label: "AR" },
  { key: "ru", label: "RU" },
];


const renderNav = (items: NavItem[]): ReactNode => (
  <ul className="main-nav">
    {items.map((item) =>
      "children" in item ? (
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
      ),
    )}
  </ul>
);


export default function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="container">
        <Link href="/" className="logo">
          <div className="logo-img-wrapper">
            <Image
              src="/logo.png"
              alt="MTR Properties"
              fill
              priority
            />
          </div>
        </Link>

        <div className="menu-right">
          <nav className="desktop-nav">{renderNav(navItems)}</nav>
          <div className="actions">
            <Button
              type="primary"
              className="contact-btn"
              icon={<PhoneOutlined />}
            >
              Contact Us
            </Button>

            <Dropdown menu={{ items: languageMenu }}>
              <a className="lang-switch">
                EN <DownOutlined />
              </a>
            </Dropdown>

            <Button
              type="text"
              aria-label="Open menu"
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
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="drawer-content">
          {renderNav(navItems)}
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            block
            className="contact-btn--mobile"
          >
            Contact Us
          </Button>

          <Dropdown menu={{ items: languageMenu }}>
            <a className="lang-switch">
              EN <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Drawer>
    </header>
  );
}
