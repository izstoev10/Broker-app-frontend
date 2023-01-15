import React, { useCallback } from "react";
import { Circle, Marker } from "@react-google-maps/api";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";

const GoogleMapsPersonalMarker = () => {
  const { currentLocation, circle, setCircle } = useGoogleMapsContext();
  const options = {
    fillColor: "red",
    strokeColor: "red",
    fillOpacity: 0.1,
    strokeOpacity: 1,
    strokeWeight: 1,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };
  const onLoad = useCallback((initialCircle) => {
    if (!circle) setCircle(initialCircle);
  }, []);
  return (
    <Marker position={currentLocation}>
      <Circle center={currentLocation} radius={circle?.radius || 0} options={options} onLoad={onLoad} />
    </Marker>
  );
};

export default GoogleMapsPersonalMarker;
