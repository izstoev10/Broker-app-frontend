import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdjustIcon from "@mui/icons-material/Adjust";
import ButtonCTA from "../../common/buttonCTA";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import GoogleMapsLocationPopUp from "../google-maps-location-popup";
import { GoogleMapsButtonsGrid, GoogleMapsButtonsWrapper } from "./styled";
import PolylineIcon from "@mui/icons-material/Polyline";
import CloseIcon from "@mui/icons-material/Close";

const GoogleMapsButtons = () => {
  const {
    circle,
    handleToggleModal,
    setCurrentLocation,
    setDrawingMode,
    currentGeofence,
    setCurrentGeofence,
    setMarkers,
  } = useGoogleMapsContext();
  const [isCurrentLocationPopUp, setIsCurrentLocationPopUp] = useState(false);
  const clearCurrentGeofence = () => {
    setCurrentGeofence(null);
    setMarkers([]);
    currentGeofence.setMap(null);
  };

  const getCurrentGeolocation = (isGetLocation) => {
    if (isGetLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        handleToggleModal();
      });
    } else {
      handleToggleModal();
    }
    setIsCurrentLocationPopUp(isGetLocation);
  };

  return (
    <>
      <GoogleMapsButtonsWrapper container gap={1}>
        <GoogleMapsButtonsGrid item pr={1} gap={1}>
          {!currentGeofence ? (
            <ButtonCTA
              onClick={() => setDrawingMode(google.maps.drawing.OverlayType.POLYGON)}
              startIcon={<PolylineIcon />}
            >
              Маркиране
            </ButtonCTA>
          ) : (
            <ButtonCTA onClick={() => clearCurrentGeofence()} startIcon={<CloseIcon />}>
              Премахни
            </ButtonCTA>
          )}
          <ButtonCTA onClick={() => getCurrentGeolocation(true)} startIcon={<LocationOnIcon />}>
            Намери ме
          </ButtonCTA>
        </GoogleMapsButtonsGrid>
        <Grid item>
          {!!circle?.getRadius() && (
            <ButtonCTA onClick={() => getCurrentGeolocation(false)} startIcon={<AdjustIcon />}>
              Радиус
            </ButtonCTA>
          )}
        </Grid>
      </GoogleMapsButtonsWrapper>
      <GoogleMapsLocationPopUp isCurrentLocationPopUp={isCurrentLocationPopUp}/>
    </>
  );
};

export default GoogleMapsButtons;
