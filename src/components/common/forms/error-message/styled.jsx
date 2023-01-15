import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const ErrorMessageText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));
