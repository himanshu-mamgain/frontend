import { useRef, useEffect } from "react";
import type { MapProps } from "../../../interface";
import { Map as olMap } from "ol";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj";

import "./Map.css";

const Map = (props: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<olMap | null>(null); // Track the map instance

  const { center, zoom } = props;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Only create map once
    mapInstanceRef.current = new olMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
