import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useGoogleMapsContext } from "../../contexts/google-maps-context";
import { markersData } from "../../__mocks__/markers";
import GoogleMapsLocationButton from "./google-maps-location-button";
import GoogleMapsPersonalMarker from "./google-maps-personal-marker";
import GoogleMapsMarker from "./google-maps-marker";

const GoogleMapsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  position: "relative",
});

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const { activeMarker, setActiveMarker, currentLocation, circle, map, setMap, isOpenPopUp } =
    useGoogleMapsContext();

  const onLoad = useCallback((map) => setMap(map), []);

  const options = useMemo(() => {
    return {
      mapTypeControl: null,
      scrollwheel: !isOpenPopUp,
      gestureHandling: isOpenPopUp ? "none" : "cooperative",
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
      ],
    };
  }, [isOpenPopUp]);
  const { lat, lng } = currentLocation;

  // useEffect(() => {
  //   if (map) {
  //     const bounds = new window.google.maps.LatLngBounds();
  //     markersData.map((marker) => {
  //       bounds.extend({
  //         lat: marker.latitude,
  //         lng: marker.longtitude,
  //       });
  //     });
  //     console.log(bounds);
  //     map.fitBounds(bounds);
  //   }
  // }, [map, markersData]);

  const checkNearMarkers = (checkPoint, centerPoint, km) => {
    const ky = 40000 / 360;
    const kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    const dx = Math.abs(centerPoint.lat - checkPoint.latitude) * kx;
    const dy = Math.abs(centerPoint.lng - checkPoint.longtitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  const centerPoint = useMemo(() => {
    return lat && lng ? { lat, lng } : { lat: 42.69789, lng: 23.32173 };
  }, [lat, lng]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMapsWrapper>
      <GoogleMap
        zoom={13}
        onLoad={onLoad}
        onClick={() =>
          setActiveMarker({
            ...activeMarker,
            id: null,
          })
        }
        onZoomChanged={() => setMap(map)}
        options={options}
        center={centerPoint}
        mapContainerStyle={containerStyle}
      >
        {markersData.map((marker, idx) => {
          const isMarkerInRange = checkNearMarkers(
            marker,
            centerPoint,
            circle?.getRadius() / 1000 || 30
          );
          return (
            isMarkerInRange && <GoogleMapsMarker key={idx} marker={marker} markerIndex={idx} />
          );
        })}
        <GoogleMapsPersonalMarker />
      </GoogleMap>
      <GoogleMapsLocationButton />
    </GoogleMapsWrapper>
  );
};

export default GoogleMaps;
