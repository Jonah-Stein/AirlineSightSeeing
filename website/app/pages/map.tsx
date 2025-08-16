import Navbar from "components/Navbar";
import {
  Layer,
  Map,
  Source,
  type LayerProps,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGetMyPins } from "app/hooks/pins";
import type { Pin } from "api/types/pins";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection } from "geojson";
import type { MapMouseEvent } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
export default function MapPage() {
  // Can hopefully find a way to remove this
  const [mapHeight, setMapHeight] = useState(300);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapContainerRef.current) {
      const height = mapContainerRef.current.offsetHeight;
      setMapHeight(height);
    }
  }, []);
  const handleResize = () => {
    const height = mapContainerRef.current?.offsetHeight || 0;
    setMapHeight(height);
    requestAnimationFrame(() => {
      mapRef.current?.resize();
    });
  };

  const [pinSelected, setPinSelected] = useState(false);

  const mapRef = useRef<MapRef>(null);
  //   const pins: Pin[] | undefined = useGetMyPins();
  const pins = [
    {
      lon: -122.4,
      lat: 37.8,
      name: "San Francisco",
      description: "San Francisco is a city in the United States",
    },
  ];

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features:
      pins?.map((pin) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [pin.lon, pin.lat] },
        properties: {
          title: pin.name,
          description: pin.description ?? "",
        },
      })) ?? [],
  };

  const layerStyle: LayerProps = {
    id: "points",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };
  const handleClick = (event: MapMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      console.log(feature);
      setPinSelected(true);
    }
  };
  const handleTransitionEnd = () => {
    mapRef.current?.resize();
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <title>Map</title>
      <meta name="description" content="Map page of the website" />
      <Navbar />
      <h1>Map</h1>
      <p>This is my map page</p>
      <button onClick={() => setPinSelected(!pinSelected)}>
        Toggle sidebar{" "}
      </button>
      <div
        ref={mapContainerRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          minWidth: 0,
          display: "grid",
          gridTemplateColumns: `1fr ${pinSelected ? 320 : 0}px`,
          transition: "grid-template-columns 250ms ease",
        }}
      >
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          interactiveLayerIds={["points"]}
          onClick={handleClick}
          style={{ width: "100%", height: mapHeight }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onResize={handleResize}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <aside
          style={{
            overflow: "auto",
            borderRight: "1px solid #eee",
            padding: pinSelected ? 12 : 0,
            position: "relative",
          }}
        >
          {pinSelected ? (
            <>
              <button
                onClick={() => setPinSelected(false)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  padding: 4,
                  lineHeight: 1,
                }}
                aria-label="Close sidebar"
              >
                ×
              </button>
              <h3 style={{ marginTop: 0 }}>Details</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                "Hello testing sidebar"
              </pre>
            </>
          ) : (
            <div style={{ opacity: 0.7 }}>Click a feature</div>
          )}
        </aside>
      </div>
    </div>
  );
}
