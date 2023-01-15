import React, { useState } from "react";
import { Typography, Slider, Grid, MenuItem } from "@mui/material";
import ButtonCTA from "../../common/buttonCTA";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";
import {
  GoogleMapsLocationPopUpButtonGrid,
  GoogleMapsLocationPopUpGrid,
  GoogleMapsLocationPopUpHeading,
  GoogleMapsLocationPopUpIcon,
  GoogleMapsLocationPopUpWrapper,
} from "./styled";
import Dropdown from "../../common/forms/dropdown";
import { propertyTypes } from "../../../__mocks__/propertyTypes";
import { Formik } from "formik";
import GoogleMapsFiltersRange from "../google-maps-filters/google-maps-filters-range";

const GoogleMapsLocationPopUp = ({ isCurrentLocationPopUp }) => {
  const {
    activeMarker,
    setActiveMarker,
    currentLocation,
    map,
    circle,
    handleToggleModal,
    isOpenPopUp,
  } = useGoogleMapsContext();
  const [locationRadius, setLocationRadius] = useState(0);
  const handleGetCurrentPosition = () => {
    setActiveMarker({
      ...activeMarker,
      id: null,
    });

    if (circle) {
      circle.setRadius(locationRadius * 1000);
      map.fitBounds(circle?.getBounds(), -100);
      map.setCenter(currentLocation);
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
    <GoogleMapsLocationPopUpWrapper
      disablePortal
      open={isOpenPopUp}
      onClose={() => handleToggleModal()}
    >
      <GoogleMapsLocationPopUpGrid container spacing={2}>
        <Grid item>
          <Grid container>
            <GoogleMapsLocationPopUpHeading item>
              <Typography variant="h6">Моля, изберете опций</Typography>
              <GoogleMapsLocationPopUpIcon onClick={() => handleToggleModal()} />
            </GoogleMapsLocationPopUpHeading>
            <Grid item xs={12}>
              <Slider
                valueLabelDisplay="auto"
                value={locationRadius}
                onChange={handleSliderChange}
                valueLabelFormat={getLabelFormat}
                defaultValue={0.5}
                max={30}
                min={0.5}
              />
              {isCurrentLocationPopUp && (
                <Formik initialValues={{ propertyType: [], maxPrice: 0, minPrice: 0 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Dropdown label="Вид на имота" name="propertyType" multiple>
                        {propertyTypes.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.type} sx={{ ml: 2 }}>
                              {item.type}
                            </MenuItem>
                          );
                        })}
                      </Dropdown>
                    </Grid>
                    <Grid item>
                      <GoogleMapsFiltersRange
                        minLabel="Мин. цена"
                        minName="minPrice"
                        maxLabel="Мaкс. цена"
                        maxName="maxPrice"
                        unit="лв."
                      />
                    </Grid>
                  </Grid>
                </Formik>
              )}
            </Grid>
          </Grid>
        </Grid>
        <GoogleMapsLocationPopUpButtonGrid item>
          <ButtonCTA onClick={() => handleGetCurrentPosition()}>Запази</ButtonCTA>
        </GoogleMapsLocationPopUpButtonGrid>
      </GoogleMapsLocationPopUpGrid>
    </GoogleMapsLocationPopUpWrapper>
  );
};

export default GoogleMapsLocationPopUp;
