"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { LatLngTuple, Map as LeafletMap } from "leaflet";
import L from "leaflet";
import { Modal, Typography } from "antd";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "./index.scss";
import { useMap } from "react-leaflet";

const { Title, Text } = Typography;

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(m => m.Popup),        { ssr: false });

const makeImageDivIcon = (bg: string, imgSrc: string) =>
  L.divIcon({
    className: "nearby-divicon",
    html: `<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${bg};"><img src="${imgSrc}" alt="" width="16" height="16" /></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const MapRefSetter: React.FC<{
  onReady: (map: LeafletMap) => void;
  center: LatLngTuple;
  zoom: number;
}> = ({ onReady, center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    map.setView(center, zoom, { animate: false });
    map.invalidateSize();
    const t = setTimeout(() => {
      map.setView(center, zoom, { animate: false });
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(t);
  }, [map, onReady, center, zoom]);
  return null;
};

type NearbyCategory = {
  key: string;
  title: string;
  color: string;
  icon: string;
  markers: { position: LatLngTuple; label?: string }[];
};

type Props = {
  center?: LatLngTuple;
  zoom?: number;
  categories?: NearbyCategory[];
};

export default function LocationNearby({
  center = [25.2048, 55.2708],
  zoom = 15,
  categories,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showModalMap, setShowModalMap] = useState(false);
  const modalMapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const t = setTimeout(() => {
      modalMapRef.current?.invalidateSize();
    }, 300);
    return () => clearTimeout(t);
  }, [modalOpen]);

  const demoCategories: NearbyCategory[] = useMemo(
    () => [
      { key: "schools", title: "Schools", color: "#EFF6FF", icon: "/icons/school.svg",
        markers: [
          { position: [center[0] + 0.003, center[1] + 0.002] },
          { position: [center[0] - 0.002, center[1] - 0.001] },
        ]},
      { key: "hospitals", title: "Hospitals", color: "#FFF1F2", icon: "/icons/hospital.svg",
        markers: [
          { position: [center[0] + 0.001, center[1] - 0.002] },
          { position: [center[0] - 0.003, center[1] + 0.001] },
        ]},
      { key: "parks", title: "Parks", color: "#ECFDF5", icon: "/icons/park.svg",
        markers: [
          { position: [center[0] + 0.002, center[1] + 0.003] },
          { position: [center[0] - 0.001, center[1] + 0.002] },
        ]},
      { key: "restaurants", title: "Restaurants", color: "#F5F3FF", icon: "/icons/restaurant.svg",
        markers: [
          { position: [center[0], center[1] + 0.0025] },
          { position: [center[0] + 0.002, center[1] - 0.002] },
        ]},
    ],
    [center]
  );

  const data = categories ?? demoCategories;

  return (
    <section className="location-nearby">
      <Title level={4} className="section-title">Location</Title>

      <div className="map-card">
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          className="map"
          style={{ width: "100%", height: "320px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>

        <button className="view-map-btn" onClick={() => setModalOpen(true)}>
            <span className="home-icon">
            <Image src="/mapicon.svg" width={18} height={18} alt="" />
            </span>
          <span>View Map</span>
        </button>
      </div>

      <Modal
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
        width={960}
        className="map-modal"
        destroyOnClose
        getContainer={false}
        afterOpenChange={(visible) => {
          setShowModalMap(visible);
          if (!visible) modalMapRef.current = null;
        }}
      >
        <div className="modal-map-wrap" style={{ width: "100%", height: 520 }}>
          {showModalMap && (
            <MapContainer
              center={center}
              zoom={zoom}
              zoomControl
              attributionControl={false}
              className="map full"
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapRefSetter
                center={center}
                zoom={zoom}
                onReady={(map) => { modalMapRef.current = map; }}
              />
              <Marker
                position={center}
                icon={makeImageDivIcon("#7038D0", "/icons/home-solid-white.svg")}
              >
                <Popup>Property location</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </Modal>

      <Title level={4} className="section-title mt">Near by Areas</Title>

      <div className="nearby-grid">
        {data.map((cat) => (
          <div key={cat.key} className="nearby-card">
            <div className="nearby-map-wrap">
              <MapContainer
                center={center}
                zoom={14}
                zoomControl={false}
                attributionControl={false}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                className="mini-map"
                style={{ width: "100%", height: 160 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {cat.markers.map((m, i) => (
                  <Marker key={i} position={m.position} icon={makeImageDivIcon(cat.color, cat.icon)} />
                ))}
              </MapContainer>
            </div>
            <Text className="nearby-title">{cat.title}</Text>
          </div>
        ))}
      </div>
    </section>
  );
}
