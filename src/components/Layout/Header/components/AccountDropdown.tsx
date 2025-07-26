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
        My Profile
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
        My Offers
      </a>
    ),
    key: "1",
  },
  {
    label: "My Bookings",
    key: "3",
  },
  {
    label: "Sign Out",
    key: "4",
  },
];

export const HeaderAccountDropdown = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<UserOutlined style={{ fontSize: 18 }} />} type="primary">
        <DownOutlined style={{ fontSize: 6 }} />
      </Button>
    </Dropdown>
  );
};
