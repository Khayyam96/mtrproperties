"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { Container } from "@/components/Lib/ProContainer/Container";

type Props = {
  lat?: string;
  long?: string;
  address?: string;
  phone?: string;
  email?: string;
};

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// API-dən gələn dəyərlər yoxdursa, Baku koordinatlarını fallback kimi istifadə edirik
const DEFAULT_CENTER: [number, number] = [40.373679, 49.9804645];

export default function MapStrip({ lat, long, address, phone, email }: Props) {
  const center: [number, number] = useMemo(() => {
    const la = parseFloat(String(lat ?? ""));
    const lo = parseFloat(String(long ?? ""));
    return Number.isFinite(la) && Number.isFinite(lo) ? [la, lo] : DEFAULT_CENTER;
  }, [lat, long]);

  return (
    <Container>
      <div className="map-strip">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "360px", width: "100%" }}
          zoomControl
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} icon={icon}>
            <Popup>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>MTR Properties</div>
              {address ? <div>{address}</div> : null}
              {phone ? <div>📞 {phone}</div> : null}
              {email ? <div>✉️ {email}</div> : null}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Container>
  );
}
