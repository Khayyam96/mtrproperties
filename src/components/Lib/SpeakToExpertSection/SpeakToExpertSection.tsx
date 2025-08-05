"use client";

import { FC } from "react";
import { Button, Typography } from "antd";
import "./index.scss";

const { Title, Text } = Typography;

export const SpeakToExpertSection: FC = () => (
  <div className="speak-to-expert-section">
    <Title level={3} className="ste-title">
      Looking for Something Specific?
    </Title>
    <Text className="ste-desc">
      Our land specialists can help you find the perfect plot that matches your exact requirements and budget.
    </Text>
    <Button className="ste-btn" type="default">
      Speak to Expert
    </Button>
  </div>
);

export default SpeakToExpertSection;
