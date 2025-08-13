"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useEffect, type FC } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Property } from "@/data/propertiesMap";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer     = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker        = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup         = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import("react-leaflet-markercluster"), { ssr: false });

export type LeafletMapProps = {
  items: Property[];
  isVisible?: boolean;
  activeId?: number | null;
};

const HOME_SVG = `
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path fill="currentColor" d="M12 3.2 3 10h1.8v9h5.4v-5.6h3.6V19H19.2v-9H21L12 3.2z"/>
  </svg>
`;

export const LeafletMap: FC<LeafletMapProps> = ({ items, isVisible = true, activeId = null }) => {
  const defaultCenter = useMemo(() => ({ lat: 25.1972, lng: 55.2744 }), []);
  const mapRef = useRef<L.Map | null>(null);

  // Map paneli görünəndə ölçünü yenilə
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize(); }, 350);
    return () => clearTimeout(t);
  }, [isVisible]);

  // Aktiv kart seçiləndə həmin koordinata fokusla
  useEffect(() => {
    if (activeId == null || !mapRef.current) return;
    const found = items.find(i => i.id === activeId);
    if (!found) return;
    mapRef.current.flyTo([found.lat, found.lng], 15, { duration: 0.6 });
  }, [activeId, items]);

  const singleIcon = useMemo(
    () =>
      L.divIcon({
        className: "mc-wrap",
        html: `<div class="m-pin"><span class="m-pin-icon">${HOME_SVG}</span></div>`,
        iconSize: L.point(34, 34, true),
      }),
    []
  );

  const activeIcon = useMemo(
    () =>
      L.divIcon({
        className: "mc-wrap",
        html: `<div class="m-pin m-pin--active"><span class="m-pin-icon">${HOME_SVG}</span></div>`,
        iconSize: L.point(38, 38, true),
      }),
    []
  );

  return (
    <div className="leaflet-wrap">
      <MapContainer
        ref={(instance) => { mapRef.current = instance; }}
        center={defaultCenter}
        zoom={13}
        preferCanvas
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          removeOutsideVisibleBounds
          maxClusterRadius={60}
          iconCreateFunction={(cluster: L.MarkerCluster): L.DivIcon => {
            const count = cluster.getChildCount();
            return L.divIcon({
              className: "mc-wrap",
              html: `
                <div class="m-cluster">
                  ${HOME_SVG}
                  <span class="m-count">${count}</span>
                </div>
              `,
              iconSize: L.point(40, 40, true),
            });
          }}
        >
          {items.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={activeId === p.id ? activeIcon : singleIcon}
            >
              <Popup>
                <div style={{ width: 180 }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 6 }}
                  />
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12 }}>AED {p.price.toLocaleString()}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
