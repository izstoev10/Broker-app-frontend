import React from "react";
import { ErrorMessageText } from "./styled";

const ErrorMessage = ({ errorText }) => {
  return (
    <ErrorMessageText component="span" variant="body2">
      {errorText}
    </ErrorMessageText>
  );
};

export default ErrorMessage;
