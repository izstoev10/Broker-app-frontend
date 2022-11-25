import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import useGetLocation from "../../../hooks/use-get-location";
import styles from "./index.module.css";
import GoogleMapsInfoWindow from "../google-maps-info-window";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";

const GoogleMapsMarker = ({ marker, markerIndex }) => {
  const { latitude, longtitude, address } = marker;
  const getLocation = useGetLocation;
  const [coordinates, setCoordinates] = useState({});
  const { activeMarker, handleOpenInfoBox } = useGoogleMapsContext();

  useEffect(() => {
    // if (!latitude || !longtitude) {
    //   (async () => {
    //     const { lat, lng } = await getLocation(address);
    //     setCoordinates({ lat, lng });
    //   })();
    // }
  }, []);

  const position = latitude && longtitude ? { lat: latitude, lng: longtitude } : coordinates;
  return (
    <Marker
      cursor="pointer"
      label={{ text: "542 лв", color: "#fff", className: styles.marker }}
      icon="undefined"
      position={position}
      onClick={() => handleOpenInfoBox(markerIndex, latitude, longtitude)}
    >
      {markerIndex === activeMarker.id && <GoogleMapsInfoWindow position={position} />}
    </Marker>
  );
};

export default GoogleMapsMarker;
