import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ResultLabelWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  background: theme.palette.neutral[600],
  width: "fit-content",
  zIndex: 10,
  position: "absolute",
  top: "50%",
  left: "7px",
  cursor: "pointer",
  transform: "translateY(-50%)",
}));
