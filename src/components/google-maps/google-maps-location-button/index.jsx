import { Box, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ButtonCTA from "../../buttonCTA";
import GoogleMapsLocationPopUp from "../google-maps-location-popup";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";

const ButtonWrapper = styled(Box)({
  top: 10,
  left: 10,
  position: "absolute",
});

const GoogleMapsLocationButton = () => {
  const { handleToggleModal, setCurrentLocation } = useGoogleMapsContext();
  const getCurrentGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
      handleToggleModal();
    });
  };

  return (
    <>
      <ButtonWrapper onClick={() => getCurrentGeolocation()}>
        <ButtonCTA>
          <Grid container columnGap={0.5} p={0.4}>
            <Grid item sx={{ display: "flex" }}>
              <LocationOnIcon />
            </Grid>
            <Grid item>Намери ме</Grid>
          </Grid>
        </ButtonCTA>
      </ButtonWrapper>
      <GoogleMapsLocationPopUp />
    </>
  );
};

export default GoogleMapsLocationButton;
