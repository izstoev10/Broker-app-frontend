import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ButtonCTAWrapper = styled(Button)(({ theme }) => ({
  background: theme.palette.neutral[900],
  color: theme.palette.text.primary,
  border: `2px solid ${theme.palette.text.primary}`,
  borderRadius: 10,
  height: "fit-content",
  
  "&:hover": {
    background: theme.palette.text.primary,
    color: theme.palette.neutral[900],
    border: `2px solid ${theme.palette.neutral[900]}`,
  },

  "&:hover > *": {
    fill: theme.palette.neutral[900],
  },
}));
