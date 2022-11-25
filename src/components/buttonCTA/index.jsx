import { Button, styled } from "@mui/material";
import React from "react";

const ButtonWrapper = styled(Button)(({ theme }) => ({
  background: "#111827",
  color: "#fff",
  border: "2px solid #fff",
  borderRadius: 10,
  "&:hover": {
    background: "#fff",
    color: "#111827",
    border: "2px solid #111827",
  },
  "&:hover > *": {
    fill: theme.palette.neutral[900],
  },
}));

const ButtonCTA = ({ children, ...rest }) => {
  return <ButtonWrapper {...rest}>{children}</ButtonWrapper>;
};

export default ButtonCTA;
