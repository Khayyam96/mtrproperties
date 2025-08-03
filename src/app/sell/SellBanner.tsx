"use client";

import { Typography } from "antd";
import Image from "next/image";


const { Title, Paragraph } = Typography;

export const SellBanner: React.FC = () => {
    return (
        <section className="hero">
            <Image
                src="/hero.png"
                alt="Luxury villa with pool"
                fill
                priority
                className="hero__bg"
            />

            <div className="hero__overlay">
                <div>
                    <Title level={2} className="hero__title">
                        Do you want to sell your property?
                    </Title>
                    <Paragraph className="hero__subtitle">
                        Here we are our specialists will help you with the greatest solution \
                    </Paragraph>
                </div>
            </div>
        </section>
    );
};

export default SellBanner;
