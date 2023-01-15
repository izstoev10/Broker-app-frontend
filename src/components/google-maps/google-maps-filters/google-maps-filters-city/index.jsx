import React, { useRef } from "react";
import { Box, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { citites } from "../../../../__mocks__/cities";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useGetCity from "../../../../hooks/use-get-city";
import { districts } from "../../../../__mocks__/districts";
import AutocompleteDropdown from "../../../common/forms/autocomplete";
import useGetFormFocusState from "../../../../hooks/use-get-form-focus-state";

const GoogleMapsFiltersCity = () => {
  const formik = useFormikContext();
  const mostPopulatedCities = citites.slice(0, 10);
  const getCity = useGetCity;

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      getCity(latitude, longitude).then((city) => {
        formik.setFieldValue("cities", [...formik.values.cities, city]);
      });
    });
  };

  return (
    <>
      <AutocompleteDropdown
        fieldValue="cities"
        name="Град"
        options={mostPopulatedCities.map((location) => location.city)}
        renderOption={(props, option) => {
          const { "data-option-index": index } = props;
          return (
            <Box key={index} flexDirection="column" display="flex">
              {index === 0 && (
                <Box>
                  <MenuItem onClick={() => getCurrentLocation()}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>До мен</Typography>
                  </MenuItem>
                  <Divider />
                </Box>
              )}
              <MenuItem onMouseLeave={(e) => e.target.classList.remove("Mui-focused")} {...props}>
                {option}
              </MenuItem>
            </Box>
          );
        }}
      />
      {!!formik.values["districts"] && (
        <AutocompleteDropdown
          name="Квартал"
          fieldValue="districts"
          groupBy={(district) => district.region}
          getOptionLabel={(district) => district.city}
          options={districts}
          renderOption={(props, option) => {
            const { "data-option-index": index } = props;
            return (
              <Box key={index} flexDirection="column" display="flex">
                <MenuItem {...props}>{option.city}</MenuItem>
              </Box>
            );
          }}
        />
      )}
    </>
  );
};

export default GoogleMapsFiltersCity;
