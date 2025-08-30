"use client";

import Link from "next/link";
import { Typography, Input, Button, Select, Space, Row, Col } from "antd";
import Image from "next/image";
import { useState } from "react";
import FilterTabs from "../../components/Lib/Tabs/FilterTabs";
import styles from "./index.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const tabs = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
];

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [activeTag, setActiveTag] = useState("all");
  const [showAdvanced, setShowAdvanced] = useState(false); 

  return (
    <section className={styles.hero}>
      <div className={styles.heroBgWrap} aria-hidden>
        <video
          className={styles.heroBg}
          src="/tour.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className={styles.heroOverlay}>
        <div className={styles.heroTop}>
          <Title level={2} className={styles.heroTitle}>
            #1 Real Estate Company in UAE
          </Title>
          <p className={styles.heroSubtitle}>
            Our Specialist Agents will help you choose the right property
          </p>

          <div className={styles.tabsWrap}>
            <FilterTabs activeKey={activeTab} onChange={setActiveTab} tabs={tabs} />
          </div>
        </div>

        <div className={styles.heroFilterBox}>
          <Row gutter={[16, 14]} className={styles.heroFilterRow1} align="middle">
            <Col xs={24} md={10} className={styles.tagsCol}>
              <Space className={styles.heroTags} size="middle">
                <Button
                  className={activeTag === "all" ? styles.active : ""}
                  onClick={() => setActiveTag("all")}
                >
                  All
                </Button>
                <Button
                  className={activeTag === "ready" ? styles.active : ""}
                  onClick={() => setActiveTag("ready")}
                >
                  Ready to Move
                </Button>
                <Button
                  className={activeTag === "off" ? styles.active : ""}
                  onClick={() => setActiveTag("off")}
                >
                  Off Plans
                </Button>
              </Space>
            </Col>

            <Col xs={24} md={14} className={styles.searchCol}>
              <div className={styles.searchLine}>
                <Input
                  placeholder="Choose Area or City"
                  className={styles.wFull}
                  prefix={
                    <Image
                      src="/location-marker.png"
                      alt="location icon"
                      width={24}
                      height={24}
                    />
                  }
                />
                {/* YALNIZ MOBİL: Advance Search toggle */}
                <button
                  type="button"
                  className={styles.advToggle}
                  onClick={() => setShowAdvanced((v) => !v)}
                  aria-expanded={showAdvanced}
                  aria-controls="advFields"
                >
                  Advance Search
                  <span
                    className={`${styles.chev} ${showAdvanced ? styles.chevOpen : ""}`}
                    aria-hidden
                  />
                </button>
              </div>
            </Col>
          </Row>

          <div
            id="advFields"
            className={`${styles.advWrap} ${showAdvanced ? styles.open : ""}`}
          >
            <Row gutter={[16, 12]} className={styles.heroForm}>
              <Col xs={12} sm={12} md={5}>
                <Text className={styles.formLabel}>Property Category</Text>
                <Select
                  defaultValue="residential"
                  className={styles.wFull}
                  suffixIcon={
                    <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                  }
                >
                  <Option value="residential">Residential</Option>
                  <Option value="commercial">Commercial</Option>
                </Select>
              </Col>

              <Col xs={12} sm={12} md={5}>
                <Text className={styles.formLabel}>Property type</Text>
                <Select
                  defaultValue="any"
                  className={styles.wFull}
                  suffixIcon={
                    <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                  }
                >
                  <Option value="any">Any</Option>
                  <Option value="villa">Villa</Option>
                </Select>
              </Col>

              <Col xs={12} sm={12} md={5}>
                <Text className={styles.formLabel}>Property Details</Text>
                <Select
                  defaultValue="bedbath"
                  className={styles.wFull}
                  suffixIcon={
                    <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                  }
                >
                  <Option value="bedbath">Bed &amp; Bath</Option>
                </Select>
              </Col>

              <Col xs={12} sm={12} md={5}>
                <Text className={styles.formLabel}>Price</Text>
                <Select
                  defaultValue="low"
                  className={styles.wFull}
                  suffixIcon={
                    <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                  }
                >
                  <Option value="low">0 - 500k</Option>
                  <Option value="mid">500k - 1M</Option>
                  <Option value="high">1M+</Option>
                </Select>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <Button type="primary" className={styles.searchBtn} block>
                  Search Now
                  <Image src="/buttonicon.png" alt="go" width={16} height={16} />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
