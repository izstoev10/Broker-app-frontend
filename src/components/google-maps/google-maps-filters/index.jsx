import { Modal, styled } from "@mui/material";
import React, { useState } from "react";
import ButtonCTA from "../../buttonCTA";

const GoogleMapsFiltersModal = styled(Modal)({
  color: "#fff",
  height: "100%",
  width: "100%",
});

const GoogleMapsFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ButtonCTA onClick={() => setIsModalOpen(true)}>Филтри</ButtonCTA>
      <GoogleMapsFiltersModal open={isModalOpen}>
        <h1>kur</h1>
      </GoogleMapsFiltersModal>
    </>
  );
};

export default GoogleMapsFilters;
