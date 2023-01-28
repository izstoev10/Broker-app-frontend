import React, { useState } from "react";
import { ListComp } from "../common/ListComp";
import { Grid, FormControl, Container, Box, Input, TextField, Button } from "@mui/material";
import tenantData from "../../shared/data/tenantData";

const Tenants = () => {
  const [tenant, setTenant] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    viber: "",
    facebook: "",
    has_kids: "",
    number_of_kids: "",
    has_pets: "",
    number_of_pets: "",
  });

  const handleChange = (event) => {
    setTenant({ ...tenant, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              variant="filled"
              color="success"
              focused
              placeholder="Enter First Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              variant="filled"
              color="success"
              focused
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default Tenants;
