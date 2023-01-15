import { FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const DropdownWrapper = styled(FormControl)(({ theme }) => ({
  margin: 1,
  width: "100%",
  position: "relative",
}));

export const DropdownMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.neutral[900],
}));

export const DropdownTextField = styled(TextField)(({ theme }) => ({
  background: "transparent",
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  zIndex: 1400,
  position: "absolute",
  left: 0,
  "& .MuiOutlinedInput-notchedOutline": { border: 0 },
}));
