declare module "react-leaflet-markercluster" {
  import { ComponentType, ReactNode } from "react";
  import * as L from "leaflet";
  import "leaflet.markercluster";

  export interface MarkerClusterGroupProps {
    children?: ReactNode;
    chunkedLoading?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    spiderfyOnMaxZoom?: boolean;
    removeOutsideVisibleBounds?: boolean;
    iconCreateFunction?: (cluster: L.MarkerCluster) => L.Icon | L.DivIcon;
    [key: string]: any;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
