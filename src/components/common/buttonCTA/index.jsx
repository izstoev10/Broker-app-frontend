import React from "react";
import { ButtonCTAWrapper } from "./styled";

const ButtonCTA = ({ children, ...rest }) => {
  return <ButtonCTAWrapper {...rest}>{children}</ButtonCTAWrapper>;
};

export default ButtonCTA;
