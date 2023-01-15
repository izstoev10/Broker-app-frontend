import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useGoogleMapsContext } from "../../contexts/google-maps-context";
import { markersData } from "../../__mocks__/markers";
import GoogleMapsPersonalMarker from "./google-maps-personal-marker";
import GoogleMapsMarker from "./google-maps-marker";
import GoogleMapsFilters from "./google-maps-filters";
import GoogleMapsButtons from "./google-maps-buttons";
import { checkNearMarkers } from "../../lib/check-near-markers";
import mapStyles from "./map-styles";
import GoogleMapsGeofence from "./google-maps-geofence";
import { GoogleMapsWrapper } from "./styled";

const libraries = ["drawing"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    language: "bg",
    region: "bg",
  });
  const {
    activeMarker,
    setActiveMarker,
    currentLocation,
    circle,
    setMap,
    map,
    isOpenPopUp,
    setCurrentLocation,
    markers,
    setMarkers,
    currentGeofence,
  } = useGoogleMapsContext();
  const onLoad = useCallback((currentMap) => {
    setMap(currentMap);
  }, []);

  const onClick = (e) => {
    setActiveMarker({
      ...activeMarker,
      id: null,
    });
    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCurrentLocation(location);
    map.panTo(location);
    map.setCenter(location);
  };

  useEffect(() => {
    // setMarkers(markersData)
  }, []);

  const options = useMemo(() => {
    return {
      mapTypeControl: null,
      scrollwheel: !isOpenPopUp,
      gestureHandling: isOpenPopUp ? "none" : "cooperative",
      styles: mapStyles,
    };
  }, [isOpenPopUp]);
  const { lat, lng } = currentLocation;

  const centerPoint = useMemo(() => {
    return lat && lng ? { lat, lng } : { lat: 42.69789, lng: 23.32173 };
  }, [lat, lng]);

  const radius = circle?.getRadius() ? circle?.getRadius() / 1000 : 30;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMapsWrapper>
      <GoogleMap
        zoom={13}
        onLoad={onLoad}
        onClick={onClick}
        // onZoomChanged={() => setMap(map)}
        options={options}
        center={centerPoint}
        mapContainerStyle={containerStyle}
      >
        {markers.map((marker, idx) => {
          const isMarkerInRange = checkNearMarkers(marker, centerPoint, radius);
          const shouldDisplayMarker = currentGeofence?.overlay || isMarkerInRange;
          return (
            shouldDisplayMarker && <GoogleMapsMarker key={idx} marker={marker} markerIndex={idx} />
          );
        })}

        <GoogleMapsPersonalMarker />
        <GoogleMapsGeofence />
      </GoogleMap>
      <GoogleMapsButtons />
      <GoogleMapsFilters />
    </GoogleMapsWrapper>
  );
};

export default GoogleMaps;
