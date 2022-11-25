import React, { useCallback, useState } from "react";
import { Modal, Typography, Slider, styled, Button, Grid } from "@mui/material";
import ButtonCTA from "../../buttonCTA";
import CloseIcon from "@mui/icons-material/Close";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";

const PopUpWrapper = styled(Modal)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  color: "white",
  background: theme.palette.neutral[900],
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    maxWidth: 400,
  },
}));

const PopUpButtonGrid = styled(Grid)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});

const PopUpGrid = styled(Grid)({
  height: "100%",
  justifyContent: "space-between",
  flexDirection: "column",
});

const PopUpHeadingGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const PopUpIcon = styled(CloseIcon)({
  fill: "white",
  cursor: "pointer",
  height: "100%",
  width: "30px",
});

const GoogleMapsLocationPopUp = () => {
  const {
    activeMarker,
    currentLocation,
    setActiveMarker,
    map,
    circle,
    isOpenPopUp,
    handleToggleModal,
  } = useGoogleMapsContext();
  const [locationRadius, setLocationRadius] = useState(0);
  const handleGetCurrentPosition = () => {
    setActiveMarker({
      ...activeMarker,
      id: null,
    });

    if (circle) {
      circle.setRadius(locationRadius * 1000);
      map.fitBounds(circle.getBounds(), -100);
      map.panBy((window.innerWidth - map.getDiv().offsetWidth) / 4, 0);
    }
    handleToggleModal();
  };

  const handleSliderChange = (_, newValue) => {
    setLocationRadius(newValue);
  };

  const getLabelFormat = (value) => {
    return `${value} км`;
  };

  return (
    <PopUpWrapper disablePortal open={isOpenPopUp} onClose={() => handleToggleModal()}>
      <PopUpGrid container>
        <Grid item>
          <Grid container>
            <PopUpHeadingGrid item xs={12}>
              <Typography variant="h6">Моля, изберете радиус от километри</Typography>
              <PopUpIcon onClick={() => handleToggleModal()} />
            </PopUpHeadingGrid>
            <Grid item xs={12}>
              <Slider
                value={locationRadius}
                onChange={handleSliderChange}
                defaultValue={0.5}
                valueLabelDisplay="auto"
                valueLabelFormat={getLabelFormat}
                max={30}
                min={0.5}
              />
            </Grid>
          </Grid>
        </Grid>
        <PopUpButtonGrid item>
          <ButtonCTA onClick={() => handleGetCurrentPosition()}>Запази</ButtonCTA>
        </PopUpButtonGrid>
      </PopUpGrid>
    </PopUpWrapper>
  );
};

export default GoogleMapsLocationPopUp;
