import { Grid, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
export const GoogleMapsLocationPopUpWrapper = styled(Modal)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "fit-content",
  transform: "translate(-50%, -50%)",
  width: "90%",
  color: theme.palette.text.primary,
  background: theme.palette.neutral[900],
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    maxWidth: 400,
  },
}));

export const GoogleMapsLocationPopUpButtonGrid = styled(Grid)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});

export const GoogleMapsLocationPopUpGrid = styled(Grid)({
  height: "100%",
  justifyContent: "space-between",
  flexDirection: "column",
});

export const GoogleMapsLocationPopUpHeading = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const GoogleMapsLocationPopUpIcon = styled(CloseIcon)({
  fill: "white",
  cursor: "pointer",
  height: "100%",
  width: "30px",
});
