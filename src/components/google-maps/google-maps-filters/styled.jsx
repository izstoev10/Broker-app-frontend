import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const GoogleMapsFiltersWrapper = styled(Box)(({ theme, open }) => ({
  color: theme.palette.text.primary,
  background: theme.palette.neutral[900],
  zIndex: theme.zIndex.drawer,
  height: open ? "100%" : 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  transition: "height .3s ease-in-out",
  overflow: "hidden",

  [theme.breakpoints.up("lg")]: {
    height: open ? "90%" : 0,
    width: 600,
  },
}));

export const GoogleMapsFiltersGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
  width: "100%",
  justifyContent: "space-between",
  overflowY: "scroll",
  overflowX: "hidden",
  padding: theme.spacing(3),
}));
