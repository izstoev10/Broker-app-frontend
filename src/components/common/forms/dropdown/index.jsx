import React, { useState, useRef, useMemo, useEffect } from "react";
import { Checkbox, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";
import ResultLabel from "../result-label";
import { DropdownWrapper } from "./styled";
import { useFormikContext } from "formik";
import useGetFormFocusState from "../../../../hooks/use-get-form-focus-state";
import useClearFormFields from "../../../../hooks/use-clear-form-fields";

const Dropdown = ({ signleSelectOptions, children, label, name, multiple, ...rest }) => {
  const { isFormFocused, toggleFocusForm } = useGetFormFocusState();
  const inputRef = useRef();

  const expensiveCalculation = () => {
    return inputRef.current?.getBoundingClientRect().top || 0;
  };
  const calculation = useMemo(() => expensiveCalculation(), [isFormFocused]);
  const formik = useFormikContext();
  const value = formik.values[name];
  const currentValue = Array.isArray(value) ? value.length : value;

  return (
    <DropdownWrapper>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={formik.values[name] || ""}
        onChange={formik.handleChange}
        renderValue={() => <></>}
        open={isFormFocused}
        multiple={multiple}
        onClose={() => toggleFocusForm()}
        onOpen={() => toggleFocusForm()}
        input={<OutlinedInput label={label} />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: window.innerHeight - calculation - 100,
            },
          },
        }}
        ref={inputRef}
        {...rest}
      >
        {children}
      </Select>
      {currentValue && !isFormFocused ? (
        <ResultLabel
          filter={value}
          name={name}
          text={`${label}(${currentValue})`}
        />
      ) : (
        <></>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
