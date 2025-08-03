"use client";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./index.scss";

type TabItem = {
  key: string;
  label: string;
};

type Props = {
  activeKey: string;
  onChange: (key: string) => void;
  tabs: TabItem[];
};

export const FilterTabs: React.FC<Props> = ({ activeKey, onChange, tabs }) => {
  // TabsProps["items"] tipinə uyğun massiv düzəlt
  const items: TabsProps["items"] = tabs.map((tab) => ({
    key: tab.key,
    label: tab.label,
  }));

  return (
    <Tabs
      activeKey={activeKey}
      onChange={onChange}
      centered
      className="filter-tabs"
      items={items}
    />
  );
};

export default FilterTabs;
