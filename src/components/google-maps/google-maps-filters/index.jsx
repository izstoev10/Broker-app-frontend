import { Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";
import ButtonCTA from "../../common/buttonCTA";
import GoogleMapsFiltersRange from "./google-maps-filters-range";
import { GoogleMapsFiltersGrid, GoogleMapsFiltersWrapper } from "./styled";
import { Formik } from "formik";
import googleMapsFiltersValidationSchema from "../../../lib/yup/google-maps-filter-schema";
import googleMapsInitialValues from "../../../lib/yup/google-maps-initial-value";
import GoogleMapsFiltersCity from "./google-maps-filters-city";
import Dropdown from "../../common/forms/dropdown";

const GoogleMapsFilters = () => {
  const { isFilterTabOpen, handleToggleFiltersTab } = useGoogleMapsContext();

  const construction = [
    { id: 1, type: "Ново" },
    { id: 2, type: "Тухла" },
    { id: 3, type: "Панел" },
    { id: 4, type: "ЕПК" },
    { id: 5, type: "Други" },
  ];

  const furnish = [
    { id: 1, type: "Обзаведен" },
    { id: 2, type: "Необзаведен" },
    { id: 3, type: "Полу-обзаведен" },
    { id: 4, type: "Луксозен" },
    { id: 5, type: "Паркомясто" },
    { id: 6, type: "Без първи етаж" },
    { id: 7, type: "Без последен етаж" },
  ];

  return (
    <GoogleMapsFiltersWrapper open={isFilterTabOpen}>
      <GoogleMapsFiltersGrid container flexDirection="column">
        <Formik
          initialValues={googleMapsInitialValues}
          onSubmit={() => {
            handleToggleFiltersTab();
          }}
          validationSchema={googleMapsFiltersValidationSchema}
        >
          {({ handleSubmit, resetForm }) => (
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Филтри</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    onClick={() => resetForm()}
                    variant="body1"
                    sx={{ cursor: "pointer" }}
                  >
                    Изчисти критериите
                  </Typography>
                </Grid>
              </Grid>
              <form onSubmit={handleSubmit}>
                <Grid gap={2} my={2} display="flex" flexDirection="column">
                  <GoogleMapsFiltersCity />
                  <Dropdown label="Конструкция" name="construction" multiple>
                    {construction.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.type}>
                          {item.type}
                        </MenuItem>
                      );
                    })}
                  </Dropdown>
                  <Dropdown label="Обзавеждане" name="furnish" multiple>
                    {furnish.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.type}>
                          {item.type}
                        </MenuItem>
                      );
                    })}
                  </Dropdown>
                  <GoogleMapsFiltersRange
                    minLabel="Мин. цена"
                    minName="minPrice"
                    maxLabel="Мaкс. цена"
                    maxName="maxPrice"
                    unit="лв."
                  />
                  <GoogleMapsFiltersRange
                    minLabel="Мин. кв. метри"
                    minName="minSquareMeters"
                    maxLabel="Мaкс. кв. метри"
                    maxName="maxSquareMeters"
                  />
                  <GoogleMapsFiltersRange
                    minLabel="Мин. стаи"
                    minName="minRooms"
                    maxLabel="Мaкс. стаи"
                    maxName="maxRooms"
                    maxLength="2"
                  />
                  <ButtonCTA type="submit">Запази</ButtonCTA>
                </Grid>
              </form>
            </Grid>
          )}
        </Formik>
      </GoogleMapsFiltersGrid>
    </GoogleMapsFiltersWrapper>
  );
};

export default GoogleMapsFilters;
