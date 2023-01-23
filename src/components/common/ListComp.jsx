import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const ListComp = ({ columns, data, isLoading }) => {
  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: "#000000",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#151e23",
          borderBotton: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#252f38",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#6f6f6f",
        },
      }}
    >
      <DataGrid rows={data} columns={columns} autoHeight={true} loading={isLoading} />
    </Box>
  );
};
