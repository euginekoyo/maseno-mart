import * as React from "react";
import {
  Grid,
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SellIcon from "@mui/icons-material/Sell";
import HandymanIcon from "@mui/icons-material/Handyman";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { fetchProducts, fetchServices } from "../../api/api";

// Import our optimized components
import ProductCard from "./ProductCard";
import AddProductServiceForms from "./AddProductServiceForms";

// Styles
const boxStyle = {
  width: "100%",
  bgcolor: "background.paper",
  mt: 1,
};

const buttonStyle = {
  width: "100%",
  minWidth: "140px",
  maxWidth: "160px",
  whiteSpace: "nowrap",
  textTransform: "none",
  borderRadius: "25px",
  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
  fontWeight: "bold",
  background: "#3498db",
  color: "#fff",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#2980b9",
    transform: "scale(1.05)",
  },
};

export default function ProductsAndServicesPage() {
  // State management
  const [products, setProducts] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [seller, setSeller] = React.useState("");
  const [brandFilter, setBrandFilter] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  
  // Modal states
  const [selectModalOpen, setSelectModalOpen] = React.useState(false);
  const [productModalOpen, setProductModalOpen] = React.useState(false);
  const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
  
  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  // Check if user is a seller
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setSeller(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        setSeller("");
      }
    }
  }, []);

  // Fetch products and services
  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const productsResponse = await fetchProducts();
        const servicesResponse = await fetchServices();
        setProducts(productsResponse.data.products);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Products" />
        <Tab label="Services" />
      </Tabs>

      <Box component="section" sx={boxStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6} sm={4} md={2.2} lg={2}>
            <Button variant="contained" sx={buttonStyle}>
              Sample Button
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
