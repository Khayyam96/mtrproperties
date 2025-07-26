"use client";

import { Tabs } from "antd";
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
  return (
    <Tabs activeKey={activeKey} onChange={onChange} centered className="filter-tabs">
      {tabs.map((tab) => (
        <Tabs.TabPane tab={tab.label} key={tab.key} />
      ))}
    </Tabs>
  );
};

export default FilterTabs;
