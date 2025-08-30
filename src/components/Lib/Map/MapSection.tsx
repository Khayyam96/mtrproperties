"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "../ProContainer/Container";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [28, 30],
  iconAnchor: [15, 45],
});

export const MapSection = () => {
  return (
    <div className="map-container" style={{padding: "30px 0", background: "#fff"}}>
      <Container>
        <MapContainer
          center={[25.1851, 55.2604]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[25.1851, 55.2604]} icon={markerIcon}>
            <Popup>MTR Properties</Popup>
          </Marker>
        </MapContainer>
      </Container>
    </div>
  );
};
