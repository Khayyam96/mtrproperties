import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        ENGLISH
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        href="https://www.aliyun.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        ARABIC
      </a>
    ),
    key: "1",
  },
  {
    label: (
      <a
        href="https://www.aliyun.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        RUSSIAN
      </a>
    ),
    key: "2",
  },
];

export const HeaderLangDropdown = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="primary">
        EN
        <DownOutlined style={{ fontSize: 6 }} />
      </Button>
    </Dropdown>
  );
};
