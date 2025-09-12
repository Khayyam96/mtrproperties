"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import {
  Typography,
  Tag,
  Row,
  Col,
  Breadcrumb,
  Button,
  Input,
} from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { TProperty } from "@/types/property";
import { Container } from "@/components/Lib/ProContainer/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationNearby from "./LocationNearby";
import "./index.scss";
import PopularProperties from "../PopularProperties";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
// import LatestBlogSection from "@/app/Home/LatestBlogSection";

const { Title, Text, Paragraph } = Typography;

type Props = { property: TProperty };

const InfoCard: FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({
  icon,
  title,
  subtitle,
}) => (
  <div className="pi-card">
    <div className="pi-icon">{icon}</div>
    <div className="pi-text">
      <div className="pi-title">{title}</div>
      {subtitle ? <div className="pi-sub">{subtitle}</div> : null}
    </div>
  </div>
);

const PropertyInner: FC<Props> = ({ property }) => {
  const [navMain, setNavMain] = useState<Slider | null>(null);
  const [navThumbs, setNavThumbs] = useState<Slider | null>(null);

  const whatsappNumber = "+994501234567";
  const phoneNumber = "+994501234567";

  return (
    <div className="property-inner">
      <Container>
        <div className="topbar">
          <Button type="link" className="back" icon={<ArrowLeftOutlined />}>
            Back to Search
          </Button>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Dubai</Breadcrumb.Item>
            <Breadcrumb.Item>Dubai Downtown</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="status-row">
          <Tag className="pill pill--verified">Verified</Tag>
          <Tag className="pill pill--new">New Listing</Tag>
        </div>

        <Row gutter={[16, 16]} align="top">
          <Col xs={24} lg={14}>
            <Slider
              asNavFor={navThumbs ?? undefined}
              ref={(s: Slider | null) => setNavMain(s)}
              arrows={false}
              dots={false}
              infinite
              speed={400}
            >
              {property.images.map((src, i) => (
                <div key={i} className="main-slide">
                  <Image src={src} alt={`${property.name}-${i}`} fill className="main-img" />
                </div>
              ))}
            </Slider>
          </Col>

          <Col xs={0} lg={4}>
            <Slider
              className="thumbs-slider"
              vertical
              verticalSwiping
              slidesToShow={3}
              swipeToSlide
              focusOnSelect
              arrows={false}
              dots={false}
              asNavFor={navMain ?? undefined}
              ref={(s: Slider | null) => setNavThumbs(s)}
              infinite
            >
              {property.images.slice(0, 3).map((src, i) => (
                <div key={i} className="thumb">
                  <Image src={src} alt={`thumb-${i}`} fill className="thumb-img" />
                </div>
              ))}
            </Slider>
          </Col>

          <Col xs={24} lg={6}>
            <div className="agent-cards">
              <div className="agent-header">
                <Image
                  src="/avatar.png"
                  alt="Milana"
                  width={50}
                  height={50}
                  className="agent-image"
                />
                <div>
                  <p className="agent-text">Contact our agent</p>
                  <p className="agent-name">Milana</p>
                </div>
              </div>

              <div className="agent-buttons">
                <Button
                  className="call-btn"
                  onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                >
                  <Image src="/phone.png" alt="Call" width={16} height={16} />
                  Call Us
                </Button>

                <Button
                  className="whatsapp-btn"
                  onClick={() =>
                    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`, "_blank")
                  }
                >
                  <Image src="/what.png" alt="Whatsapp" width={16} height={16} />
                  Whatsapp
                </Button>
              </div>

              <div className="agent-form">
                <label>Name</label>
                <Input placeholder="eg: John Doe" />

                <label>Email</label>
                <Input placeholder="eg: john@email.com" />

                <label>Phone Number</label>
                <Input
                  addonBefore={
                    <div className="phone-prefix">
                      <Image src="/uae-flag.png" alt="uae" width={20} height={14} />
                      <span className="prefix-text">+971</span>
                    </div>
                  }
                  placeholder="eg: 050123456"
                />

                <label>Message</label>
                <Input.TextArea placeholder="eg: I want to know about..." rows={3} />

                <Button type="primary" className="submit-btn">
                  Submit
                  <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={19}>
            <div className="calculate-block">
              <Text className="calc-text">
                Own this property for just <strong>5,250 AED</strong> a month
              </Text>

              <div className="calc-actions">
                <Button className="calc-btn ghost">Mortgage Calculator</Button>

                <Button
                  className="calc-btn whatsapp"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
                      "_blank"
                    )
                  }
                >
                  Whatsapp
                  <Image
                    src="/whatwhite.png"
                    alt="whatsapp"
                    width={18}
                    height={18}
                    className="wa-icon"
                  />
                </Button>
              </div>
            </div>

            <div className="price-block">
              <div className="type">Apartment</div>
              <div className="prices">
                <del>
                  <Title level={5} className="old-price">
                    AED {Number(property.price + 100000).toLocaleString()}
                  </Title>
                </del>
                <Title level={2} className="price">
                  AED {Number(property.price).toLocaleString()} / month
                </Title>
              </div>
              <Title level={4} className="headline">
                {property.name || "Name of the apartment"}
              </Title>
              <Paragraph className="lead">
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout.
              </Paragraph>
              <div className="place">
                <EnvironmentOutlined />
                <span className="text">Place of this property</span>
              </div>
            </div>

            <Title level={4} className="section-title">Property Information</Title>
            <div className="pi-grid">
              <InfoCard
                icon={<Image src="/propertimg1.png" alt="Bedroom" width={24} height={24} />}
                title={`${property.bedrooms} Bedroom & maid`}
              />
              <InfoCard
                icon={<Image src="/propertimg2.png" alt="Bathroom" width={24} height={24} />}
                title={`${property.bathrooms} Bathroom`}
              />
              <InfoCard
                icon={<Image src="/propertimg3.png" alt="Area" width={24} height={24} />}
                title={`${property.area} sqft`}
              />
              <InfoCard
                icon={<Image src="/propertimg4.png" alt="Large Balcony" width={24} height={24} />}
                title="Large Balcony"
              />
              <InfoCard
                icon={<Image src="/propertimg5.png" alt="Marina & Sea Views" width={24} height={24} />}
                title="Marina & Sea Views"
              />
            </div>

            <Title level={4} className="section-title">Amenities</Title>
            <div className="amenities">
              {(property.amenities?.length ? property.amenities : [
                "Unfurnished", "Balcony", "Covered Parking", "Security", "Shared Gym", "Shared Pool",
                "View of Landmark", "View of Water", "Covered Parking"
              ]).map((a) => (
                <span key={a} className="amenity">{a}</span>
              ))}
            </div>

            <Title level={4} className="section-title">Description</Title>
            <div className="desc">
              <div className="badges">
                <Tag>Brand New</Tag>
                <Tag>Vacant Now</Tag>
                <Tag>Large Balcony</Tag>
              </div>
              <Paragraph>
                {property.description ||
                  "Standpoint Real Estate is proud to present this Two Bedroom apartment in the brand new."}
              </Paragraph>
              <Paragraph>
                The property is available now. This two bedroom apartment consists of a spacious living
                room and open kitchen, two generous size bathrooms and a guest toilet as well as a huge
                balcony with incredible views of the Marina and the beach.
              </Paragraph>
              <Paragraph>
                For more information about this property or to arrange a viewing with the agent.
              </Paragraph>
            </div>

            <LocationNearby />
          </Col>
        </Row>

        <PopularProperties />
        <SubscribeSection />
        {/* <LatestBlogSection /> */}
      </Container>
    </div>
  );
};

export default PropertyInner;
