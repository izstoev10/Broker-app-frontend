import React, { useEffect, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useGetFormFocusState from "../../../../hooks/use-get-form-focus-state";
import { AutocompleteDropdownWrapper } from "./styled";
import ResultLabel from "../result-label";
import { useFormikContext } from "formik";
import ErrorMessage from "../error-message";

const AutocompleteDropdown = ({ name, fieldValue, ...rest }) => {
  const { isFormFocused, toggleFocusForm } = useGetFormFocusState();
  const formik = useFormikContext();
  const errorMessage = formik.errors[fieldValue];
  const autocompleteRef = useRef();
  const value = formik.values[fieldValue];
  const isCityFieldTouched = formik.touched[fieldValue]
  const currentValue = Array.isArray(value) ? value.length : value;
  useEffect(() => {
    if (errorMessage) {
      autocompleteRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [formik.isSubmitting]);
  return (
    <>
      <AutocompleteDropdownWrapper>
        <Autocomplete
          id={name}
          onBlur={formik.handleBlur}
          disablePortal
          selectOnFocus
          multiple
          disableCloseOnSelect
          disableClearable
          onClose={() => toggleFocusForm()}
          onOpen={() => toggleFocusForm()}
          onChange={(_, value) => formik.setFieldValue(fieldValue, value)}
          renderTags={() => {}}
          ref={autocompleteRef}
          {...rest}
          renderInput={(params) => (
            <TextField error={isCityFieldTouched && !!errorMessage} {...params} label={name} />
          )}
        />
        {currentValue && !isFormFocused ? (
          <ResultLabel filter={value} name={fieldValue} text={`${name}(${currentValue})`} />
        ) : (
          <></>
        )}
        {isCityFieldTouched && !!errorMessage && <ErrorMessage errorText={errorMessage} />}
      </AutocompleteDropdownWrapper>
    </>
  );
};

export default AutocompleteDropdown;
