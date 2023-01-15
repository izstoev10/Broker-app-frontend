import { Grid, Select } from "@mui/material";
import { styled } from "@mui/system";

export const GoogleMapsButtonsWrapper = styled(Grid)(({ theme }) => ({
  top: 10,
  left: 10,
  position: "absolute",
  width: "auto",
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const GoogleMapsButtonsGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));
