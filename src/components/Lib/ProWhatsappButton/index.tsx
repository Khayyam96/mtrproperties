import { WhatsAppOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ProWhatsappButton = () => {
  return (
    <Button ghost className="btn-whatsapp">
      WHATSAPP
      <WhatsAppOutlined />
    </Button>
  );
};
