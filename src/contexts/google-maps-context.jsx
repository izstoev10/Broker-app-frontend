import React, { useState, createContext, useContext } from "react";

export const GoogleMapsContext = createContext(null);

export function GoogleMapsProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [activeMarker, setActiveMarker] = useState({ id: null, coordinates: { lat: 0, lng: 0 } });
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);

  const handleToggleModal = () => {
    setIsOpenPopUp((prev) => (prev = !prev));
    setActiveMarker({
      ...activeMarker,
      id: null,
    });
  };

  const handleOpenInfoBox = (markerIndex, latitude, longitude) => {
    const coordinates = { lat: latitude, lng: longitude };
    if (activeMarker.id !== markerIndex) {
      setActiveMarker({
        ...activeMarker,
        id: markerIndex,
        coordinates,
      });
      map.setCenter(coordinates);
      map.panTo(coordinates);
    } else {
      setActiveMarker({
        ...activeMarker,
        id: null,
      });
    }
  };

  return (
    <GoogleMapsContext.Provider
      value={{
        currentLocation,
        activeMarker,
        map,
        circle,
        isOpenPopUp,
        setCurrentLocation,
        handleOpenInfoBox,
        setActiveMarker,
        setMap,
        setCircle,
        handleToggleModal,
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}

export const useGoogleMapsContext = () => useContext(GoogleMapsContext);
