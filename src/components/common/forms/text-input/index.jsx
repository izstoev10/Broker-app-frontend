import React from "react";
import { TextField } from "@mui/material";
import { TextInputWrapper } from "./styled";
import ResultLabel from "../result-label";
import useGetFormFocusState from "../../../../hooks/use-get-form-focus-state";
import ErrorMessage from "../error-message";
import { useFormikContext } from "formik";

const TextInput = ({ label, name, unit, maxLength, ...rest }) => {
  const { isFormFocused, toggleFocusForm } = useGetFormFocusState();
  const formik = useFormikContext();
  const value = formik.values[name] || "";
  const error = formik.errors[name];
  const isPriceFilter = name === "minPrice" || name === "maxPrice";
  return (
    <TextInputWrapper>
      <TextField
        name={name}
        onChange={formik.handleChange}
        fullWidth
        label={label}
        value={value}
        type="number"
        variant="outlined"
        onBlur={() => toggleFocusForm(false)}
        onFocus={() => toggleFocusForm(true)}
        error={!!error}
        {...rest}
      />
      {error && <ErrorMessage errorText={error} />}
      {value && !isFormFocused && !error ? (
        <ResultLabel
          filter={value}
          name={name}
          text={`${label}: ${value}${isPriceFilter ? "лв." : ""}`}
        />
      ) : (
        <></>
      )}
    </TextInputWrapper>
  );
};

export default TextInput;
