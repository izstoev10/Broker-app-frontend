import React, { useState, createContext, useContext } from "react";

export const GoogleMapsContext = createContext(null);

export function GoogleMapsProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  const [drawingMode, setDrawingMode] = useState("");
  const [currentGeofence, setCurrentGeofence] = useState(null);
  const [activeMarker, setActiveMarker] = useState({ id: null, coordinates: { lat: 0, lng: 0 } });
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [isFilterTabOpen, setisFilterTabOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpenPopUp((prev) => !prev);
    setisFilterTabOpen(false);
    setActiveMarker({
      ...activeMarker,
      id: null,
    });
  };

  const handleToggleFiltersTab = () => {
    setisFilterTabOpen((prev) => !prev);
    setIsOpenPopUp(false);
  };

  const handleOpenInfoBox = (markerIndex, latitude, longitude) => {
    const coordinates = { lat: latitude, lng: longitude };
    if (activeMarker.id !== markerIndex) {
      setActiveMarker({
        ...activeMarker,
        id: markerIndex,
        coordinates,
      });
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
        isFilterTabOpen,
        isOpenPopUp,
        currentGeofence,
        drawingMode,
        markers,
        setMarkers,
        setCurrentLocation,
        handleOpenInfoBox,
        handleToggleFiltersTab,
        setActiveMarker,
        setMap,
        setCircle,
        handleToggleModal,
        setDrawingMode,
        setCurrentGeofence,
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}

export const useGoogleMapsContext = () => useContext(GoogleMapsContext);
