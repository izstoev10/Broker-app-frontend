const useClearFormFields = (formik) => {
  const clearFilter = (filter) => {
    if (filter) {
      const updatedValue = formik.initialValues[filter];
      formik.setFieldValue(filter, updatedValue);
    } else {
      formik.resetForm({values:formik.initialValues});
    }
  };

  return clearFilter;
};

export default useClearFormFields;
