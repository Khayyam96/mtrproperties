"use client";

import { Col, Row, Typography, Tag, Button, Input, Form, Select } from "antd";
import Image from "next/image";
import { PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./index.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const BuyInner = () => {
  return (
    <div className="buyinner-page">
      
    </div>
  );
};
