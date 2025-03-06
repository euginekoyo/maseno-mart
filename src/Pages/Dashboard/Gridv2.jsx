import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ProductsAndServicesPage from "./ProductsAndServicesPage"

export default function RowAndColumnSpacing() {
  return (
    <Box mb={8}>
      <ProductsAndServicesPage />
    </Box>
  );
}
