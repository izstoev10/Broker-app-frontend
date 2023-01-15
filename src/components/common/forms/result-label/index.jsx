import { Grid, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ResultLabelWrapper } from "./styled";
import useGetFormFocusState from "../../../../hooks/use-get-form-focus-state";
import useClearFormFields from "../../../../hooks/use-clear-form-fields";
import { useFormikContext } from "formik";

const ResultLabel = ({ name, text }) => {
  const formik = useFormikContext();
  const clearFilter = useClearFormFields(formik);

  return (
    <ResultLabelWrapper>
      <Grid container columnGap={1}>
        <Grid item>
          <Typography component="span" variant="body1">
            {text}
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <CloseIcon onClick={() => clearFilter(name)} sx={{ cursor: "pointer" }} />
        </Grid>
      </Grid>
    </ResultLabelWrapper>
  );
};

export default ResultLabel;
