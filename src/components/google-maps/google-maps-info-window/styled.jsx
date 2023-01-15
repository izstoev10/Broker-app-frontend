import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const GoogleMapsInfoWindowImageContainer = styled(Grid)({
  width: "100%",
  height: "100%",
  position: "relative",
});

export const GoogleMapsInfoWindowDescriptionGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexDirection: "column",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const GoogleMapsInfoWindowDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral[900],
}));
