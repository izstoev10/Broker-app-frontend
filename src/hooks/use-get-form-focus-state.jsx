import { useState } from "react";

const useGetFormFocusState = () => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const toggleFocusForm = () => {
    setIsFormFocused((prev) => (prev = !prev));
  };
  return { isFormFocused, toggleFocusForm };
};

export default useGetFormFocusState;
