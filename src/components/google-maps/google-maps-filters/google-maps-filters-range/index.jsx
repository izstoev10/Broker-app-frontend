import React from "react";
import { Grid } from "@mui/material";
import TextInput from "../../../common/forms/text-input";

const GoogleMapsFiltersRange = ({ minLabel, minName, maxLabel, maxName }) => {
  return (
    <Grid container spacing={2}>
      <Grid item width="100%" xs={12} md={6}>
        <TextInput label={minLabel} name={minName} />
      </Grid>
      <Grid item width="100%" xs={12} md={6}>
        <TextInput label={maxLabel} name={maxName} />
      </Grid>
    </Grid>
  );
};

export default GoogleMapsFiltersRange;
