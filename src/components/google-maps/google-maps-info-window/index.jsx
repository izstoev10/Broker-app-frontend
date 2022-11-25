import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import { styled } from "@mui/system";
import Image from "next/image";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";
import "./index.module.css";

const InfoWindowImage = styled(Grid)({
  width: "100%",
  height: "100%",
  position: "relative",
});

const InfoWindowTextContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexDirection: "column",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const GoggleMapsInfoWindow = ({ position }) => {
  const { activeMarker, setActiveMarker } = useGoogleMapsContext();
  const [paddingTop, setPaddingTop] = useState("0");
  return (
    <InfoWindow
      position={position}
      options={{ pixelOffset: { height: -25 } }}
      onCloseClick={() =>
        setActiveMarker({
          ...activeMarker,
          id: null,
        })
      }
    >
      <Grid container>
        <InfoWindowImage item style={{ paddingTop }}>
          <Image
            src="https://imgs.search.brave.com/xTFrB3RwE1huWY3Kg-Rl2jSDnY_ltZfADL0LSoIa31M/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3Lmxh/bmRsb3JkZ3VpZGFu/Y2UuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzA5L1Jl/bnRhbC1Qcm9wZXJ0/eS1MaXN0aW5nLVBo/b3RvZ3JhcGgtRXhh/bXBsZS5qcGc_cmVz/aXplPTIwOTAlMkMx/MzA2JnNzbD0x"
            layout="fill"
            objectFit="contain"
            style={{ maxHeight: 200 }}
            onLoad={({ target }) => {
              const { naturalWidth, naturalHeight } = target;
              setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
            }}
          />
        </InfoWindowImage>
        <Grid item>
          <Grid container px={2} py={1}>
            <InfoWindowTextContainer>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                383 лв
              </Typography>
              <Typography variant="body2">кв. Център, гр. София</Typography>
            </InfoWindowTextContainer>
            <InfoWindowTextContainer>
              <Typography variant="body2">Двустаен апартамент</Typography>
              <Typography variant="body2">55 m²</Typography>
            </InfoWindowTextContainer>
          </Grid>
        </Grid>
      </Grid>
    </InfoWindow>
  );
};

export default GoggleMapsInfoWindow;
