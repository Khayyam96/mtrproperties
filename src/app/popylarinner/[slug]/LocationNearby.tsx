"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import Image from "next/image";
import { Typography } from "antd";
import "leaflet/dist/leaflet.css";
import "./index.scss";

const { Title, Text } = Typography;

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(m => m.Popup),        { ssr: false });

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties";

function buildImgUrl(name?: string | null) {
  if (!name) return "";
  if (/^https?:\/\//i.test(name)) return name;
  if (name.startsWith("/uploads/properties/")) {
    return `https://api.dubaiyachts.com${name}`;
  }
  return `${MEDIA_BASE}/${name}`.replace(/([^:]\/)\/+/g, "$1");
}

type TLandmark = {
  id: number;
  type: string;
  name: string;
  lat: string | number;
  long: string | number;
  image_url?: string | null;
  is_most_popular?: boolean;
};

type Props = {
  address?: string | null;
  center?: LatLngTuple;
  lat?: number;
  lng?: number;
  zoom?: number;
  landmarks?: TLandmark[];
};

export default function LocationNearby({
  address,
  center: centerProp,
  lat,
  lng,
  zoom = 15,
  landmarks = [],
}: Props) {
  const computedCenter = useMemo<LatLngTuple>(() => {
    if (centerProp && Number.isFinite(centerProp[0]) && Number.isFinite(centerProp[1])) {
      return centerProp as LatLngTuple;
    }
    if (typeof lat === "number" && typeof lng === "number" && Number.isFinite(lat) && Number.isFinite(lng)) {
      return [lat, lng];
    }
    return [25.2048, 55.2708]; // Dubai default
  }, [centerProp, lat, lng]);

  const landmarkMarkers = useMemo(
    () =>
      (landmarks || [])
        .map((lm) => {
          const la = typeof lm.lat === "string" ? parseFloat(lm.lat) : lm.lat;
          const lo = typeof lm.long === "string" ? parseFloat(lm.long) : lm.long;
          if (!Number.isFinite(la) || !Number.isFinite(lo)) return null;
          return {
            id: lm.id,
            center: [la as number, lo as number] as LatLngTuple,
            label: lm.name,
            img: lm.image_url ? buildImgUrl(lm.image_url) : undefined,
          };
        })
        .filter(Boolean) as {
          id: number;
          center: LatLngTuple;
          label: string;
          img?: string;
        }[],
    [landmarks]
  );

  return (
    <section className="location-nearby">
      <Title level={4} className="section-title">Location</Title>

      <div className="map-card">
        <MapContainer
          center={computedCenter}
          zoom={zoom}
          zoomControl
          attributionControl={false}
          scrollWheelZoom
          dragging
          doubleClickZoom
          className="map"
          style={{ width: "100%", height: "320px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={computedCenter}>
            <Popup>
              <div style={{ maxWidth: 240 }}>
                <strong>Property location</strong>
                {address ? <div style={{ marginTop: 6 }}>{address}</div> : null}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <Title level={4} className="section-title mt">Nearby Places</Title>

      <div className="nearby-grid">
        {landmarkMarkers.length === 0 ? (
          <Text className="amenities-empty">No nearby places provided.</Text>
        ) : (
          landmarkMarkers.map((m) => (
            <div key={m.id} className="nearby-card">
              <div className="nearby-map-wrap">
                <MapContainer
                  center={m.center}
                  zoom={14}
                  zoomControl
                  attributionControl={false}
                  scrollWheelZoom={false}
                  dragging
                  doubleClickZoom={false}
                  className="mini-map"
                  style={{ width: "100%", height: 160 }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={m.center}>
                    <Popup>
                      <div style={{ maxWidth: 260 }}>
                        <strong>{m.label}</strong>
                        {m.img ? (
                          <div style={{ marginTop: 8, borderRadius: 8, overflow: "hidden" }}>
                            <Image
                              src={m.img}
                              alt={m.label}
                              width={260}
                              height={120}
                              loader={({ src }) => src} // next.config-a ehtiyac olmadan
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
