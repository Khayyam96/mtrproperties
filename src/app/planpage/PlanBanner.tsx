"use client";

import { Typography } from "antd";
import Image from "next/image";
import "./index.scss"


const { Title, Paragraph } = Typography;

export const PlanBanner: React.FC = () => {
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
                        Latest Upcoming Project
                    </Title>
                    <Paragraph className="hero__subtitle">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.                    </Paragraph>
                </div>
            </div>
        </section>
    );
};

export default PlanBanner;
