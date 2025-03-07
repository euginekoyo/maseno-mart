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
import { BlinkBlur } from "react-loading-indicators";
// Import our optimized components
import ProductCard from "./ProductCard";
import AddProductServiceForms from "./AddProductServiceForms";

// Styles
const boxStyle = {
  width: "100%",
  bgcolor: "background.paper",
  mt: 1,
};
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
  background: "linear-gradient(135deg, #007bff 30%, #0056b3 90%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(135deg, #0056b3 30%, #004494 90%)",
  },
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
  background: "linear-gradient(135deg, #007bff 30%, #0056b3 90%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(135deg, #0056b3 30%, #004494 90%)",
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
  // Fetch products and services
  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const productsResponse = await fetchProducts();
        const servicesResponse = await fetchServices();
        // Ensure we're setting arrays for both products and services
        const productsData = productsResponse?.data?.products || [];

        // Handle the nested array structure properly
        let servicesData = [];
        if (servicesResponse?.data?.data) {
          if (
            Array.isArray(servicesResponse?.data?.data) &&
            servicesResponse?.data?.data.length > 0
          ) {
            // Check if the first element is an array (as shown in your data structure)
            if (Array.isArray(servicesResponse?.data?.data[0])) {
              servicesData = servicesResponse?.data?.data[0];
              console.log(servicesData);
            } else {
              // Handle case where it's a flat array of services
              servicesData = servicesResponse?.data?.data;
            }
          } else if (typeof servicesResponse?.data?.data === "object") {
            // Handle object structure if needed
            servicesData = Object.values(servicesResponse.data);
          }
        }

        // Remove console logs for production
        // console.log("Products data:", productsData);
        // console.log("Services data:", servicesData);

        setProducts(productsData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  // Fetch products and services
  // Fetch products and services
  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const productsResponse = await fetchProducts();
        const servicesResponse = await fetchServices();
        // Ensure we're setting arrays for both products and services
        const productsData = productsResponse?.data?.products || [];

        // Handle the nested array structure properly
        let servicesData = [];
        if (servicesResponse?.data?.data) {
          if (
            Array.isArray(servicesResponse?.data?.data) &&
            servicesResponse?.data?.data.length > 0
          ) {
            // Check if the first element is an array (as shown in your data structure)
            if (Array.isArray(servicesResponse?.data?.data[0])) {
              servicesData = servicesResponse?.data?.data[0];
              console.log(servicesData);
            } else {
              // Handle case where it's a flat array of services
              servicesData = servicesResponse?.data?.data;
            }
          } else if (typeof servicesResponse?.data?.data === "object") {
            // Handle object structure if needed
            servicesData = Object.values(servicesResponse.data);
          }
        }

        // Remove console logs for production
        // console.log("Products data:", productsData);
        // console.log("Services data:", servicesData);

        setProducts(productsData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
    getData();
  }, []);

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setBrandFilter("");
  };
  // Event handlers
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setBrandFilter("");
  };

  const handleOpenSelectModal = () => setSelectModalOpen(true);
  const handleCloseSelectModal = () => setSelectModalOpen(false);
  const handleOpenSelectModal = () => setSelectModalOpen(true);
  const handleCloseSelectModal = () => setSelectModalOpen(false);

  const handleOpenFormModal = (type) => {
    setSelectModalOpen(false);
    if (type === "product") setProductModalOpen(true);
    else setServiceModalOpen(true);
  };
  const handleOpenFormModal = (type) => {
    setSelectModalOpen(false);
    if (type === "product") setProductModalOpen(true);
    else setServiceModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };
  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

  const handleCloseServiceModal = () => {
    setServiceModalOpen(false);
  };
  const handleCloseServiceModal = () => {
    setServiceModalOpen(false);
  };

  const handleBrandFilterChange = (brand) => {
    setBrandFilter(brand === brandFilter ? "" : brand);
  };
  const handleBrandFilterChange = (brand) => {
    setBrandFilter(brand === brandFilter ? "" : brand);
  };

  // Filter options
  const getFilters = () => {
    const baseFilters = [];

    if (seller === "seller") {
      baseFilters.push({
        label: "Add Product/Service",
        icon: <DeliveryDiningIcon fontSize="small" />,
        action: handleOpenSelectModal,
      });
    }

    if (activeTab === 0 || activeTab === 1) {
      baseFilters.push(
        {
          label: "Brand New",
          icon: <ShoppingBagIcon fontSize="small" />,
          action: () => handleBrandFilterChange("Brand New"),
          active: brandFilter === "Brand New",
        },
        {
          label: "Second Hand",
          icon: <SellIcon fontSize="small" />,
          action: () => handleBrandFilterChange("Second Hand"),
          active: brandFilter === "Second Hand",
        },
        {
          label: "New Product",
          icon: <LocalShippingIcon fontSize="small" />,
          action: () => handleBrandFilterChange("New Product"),
          active: brandFilter === "New Product",
        }
      );
    }

    if (activeTab === 0 || activeTab === 2) {
      baseFilters.push({
        label: "New Service",
        icon: <HandymanIcon fontSize="small" />,
        action: () => handleBrandFilterChange("New Service"),
        active: brandFilter === "New Service",
      });
    }

    return baseFilters;
  };

  const isRecent = (date) => {
    if (!date) return false;
    const now = new Date();
    const postedDate = new Date(date);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };
  const isRecent = (date) => {
    if (!date) return false;
    const now = new Date();
    const postedDate = new Date(date);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  // Ensure products is an array before filtering
  const productsArray = Array.isArray(products) ? products : [];
  const filteredProducts = productsArray.filter((product) => {
    if (!product) return false;
    if (brandFilter === "Brand New" && product.brand !== "1") return false;
    if (brandFilter === "Second Hand" && product.brand !== "2") return false;
    if (brandFilter === "New Product" && !isRecent(product.createdAt))
      return false;
    return true;
  });
  // Ensure products is an array before filtering
  const productsArray = Array.isArray(products) ? products : [];
  const filteredProducts = productsArray.filter((product) => {
    if (!product) return false;
    if (brandFilter === "Brand New" && product.brand !== "1") return false;
    if (brandFilter === "Second Hand" && product.brand !== "2") return false;
    if (brandFilter === "New Product" && !isRecent(product.createdAt))
      return false;
    return true;
  });

  // Ensure services is an array before filtering
  const servicesArray = Array.isArray(services) ? services : [];
  const filteredServices = servicesArray.filter((service) => {
    if (!service) return false;
    if (brandFilter === "New Service" && !isRecent(service.createdAt))
      return false;
    return true;
  });

  // Dynamic filters based on active tab
  const filters = getFilters();
  // Ensure services is an array before filtering
  const servicesArray = Array.isArray(services) ? services : [];
  const filteredServices = servicesArray.filter((service) => {
    if (!service) return false;
    if (brandFilter === "New Service" && !isRecent(service.createdAt))
      return false;
    return true;
  });

  // Dynamic filters based on active tab
  const filters = getFilters();

  // Error handling
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error loading products and services: {error.message}
        </Typography>
      </Box>
    );
  }
  // Error handling
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error loading products and services: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Products" />
        <Tab label="Services" />
      </Tabs>

      <Box component="section" sx={boxStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {filters.map((filter, index) => (
            <Grid item key={index} xs={6} sm={4} md={2.2} lg={2}>
              <Button
                variant="contained"
                startIcon={filter.icon}
                sx={{
                  ...buttonStyle,
                  ...(filter.active && {
                    background:
                      "linear-gradient(135deg, #0056b3 30%, #004494 90%)",
                  }),
                }}
                onClick={filter.action || undefined}
              >
                {filter.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Atom color="#3977cf" size="large" text="Waiting...." textColor="" />
        </Box>
      ) : (
        <>
          {(activeTab === 0 &&
            [...filteredProducts, ...filteredServices].length === 0) ||
          (activeTab === 1 && filteredProducts.length === 0) ||
          (activeTab === 2 && filteredServices.length === 0) ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              No{" "}
              {activeTab === 0
                ? "products or services"
                : activeTab === 1
                  ? "products"
                  : "services"}{" "}
              available
            </Typography>
          ) : (
            <Grid container spacing={1} justifyContent="center">
              {activeTab === 0 &&
                [...filteredProducts, ...filteredServices].map(
                  (item, index) => (
                    <Grid
                      item
                      mt={4}
                      xs={6}
                      sm={6}
                      md={4}
                      lg={2}
                      key={item._id || `item-${index}`}
                    >
                      <Box mx={1}>
                        <ProductCard
                          item={item}
                          type={
                            item.price !== undefined ? "product" : "service"
                          }
                          item={item}
                          type={
                            item.price !== undefined ? "product" : "service"
                          }
                        />
                      </Box>
                      </Box>
                    </Grid>
                  )
                )}
              {activeTab === 1 &&
                filteredProducts.map((product, index) => (
                  <Grid
                    item
                    mt={4}
                    px={0.5}
                    xs={6}
                    sm={6}
                    md={4}
                    lg={2}
                    key={product._id || `product-${index}`}
                  >
                    <ProductCard item={product} type="product" />
                  </Grid>
                ))}
              {activeTab === 2 &&
                filteredServices.map((service, index) => (
                  <Grid
                    item
                    mt={4}
                    px={0.5}
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    key={service._id || `service-${index}`}
                  >
                    <ProductCard item={service} type="service" />
                  </Grid>
                ))}
            </Grid>
          )}
        </>
      )}
                  )
                )}
              {activeTab === 1 &&
                filteredProducts.map((product, index) => (
                  <Grid
                    item
                    mt={4}
                    px={0.5}
                    xs={6}
                    sm={6}
                    md={4}
                    lg={2}
                    key={product._id || `product-${index}`}
                  >
                    <ProductCard item={product} type="product" />
                  </Grid>
                ))}
              {activeTab === 2 &&
                filteredServices.map((service, index) => (
                  <Grid
                    item
                    mt={4}
                    px={0.5}
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    key={service._id || `service-${index}`}
                  >
                    <ProductCard item={service} type="service" />
                  </Grid>
                ))}
            </Grid>
          )}
        </>
      )}

      {/* Forms Component */}
      <AddProductServiceForms
        selectModalOpen={selectModalOpen}
        productModalOpen={productModalOpen}
        serviceModalOpen={serviceModalOpen}
        handleCloseSelectModal={handleCloseSelectModal}
        handleCloseProductModal={handleCloseProductModal}
        handleCloseServiceModal={handleCloseServiceModal}
        handleOpenFormModal={handleOpenFormModal}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
        refreshData={() => {
          setLoading(true);
          Promise.all([fetchProducts(), fetchServices()])
            .then(([productsResponse, servicesResponse]) => {
              const productsData = productsResponse?.data?.products || [];

              let servicesData = [];
              if (servicesResponse?.data?.data) {
                if (
                  Array.isArray(servicesResponse?.data?.data) &&
                  servicesResponse?.data?.data.length > 0
                ) {
                  // Check if the first element is an array (as shown in your data structure)
                  if (Array.isArray(servicesResponse?.data?.data[0])) {
                    servicesData = servicesResponse?.data?.data[0];
                  } else {
                    // Handle case where it's a flat array of services
                    servicesData = servicesResponse?.data?.data;
                  }
                } else if (typeof servicesResponse?.data?.data === "object") {
                  // Handle object structure if needed
                  servicesData = Object.values(servicesResponse?.data?.data);
                }
              }

              setProducts(productsData);
              setServices(servicesData);
            })
            .catch((error) => {
              console.error("Error refreshing data:", error);
              setError(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
      {/* Forms Component */}
      <AddProductServiceForms
        selectModalOpen={selectModalOpen}
        productModalOpen={productModalOpen}
        serviceModalOpen={serviceModalOpen}
        handleCloseSelectModal={handleCloseSelectModal}
        handleCloseProductModal={handleCloseProductModal}
        handleCloseServiceModal={handleCloseServiceModal}
        handleOpenFormModal={handleOpenFormModal}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
        refreshData={() => {
          setLoading(true);
          Promise.all([fetchProducts(), fetchServices()])
            .then(([productsResponse, servicesResponse]) => {
              const productsData = productsResponse?.data?.products || [];

              let servicesData = [];
              if (servicesResponse?.data?.data) {
                if (
                  Array.isArray(servicesResponse?.data?.data) &&
                  servicesResponse?.data?.data.length > 0
                ) {
                  // Check if the first element is an array (as shown in your data structure)
                  if (Array.isArray(servicesResponse?.data?.data[0])) {
                    servicesData = servicesResponse?.data?.data[0];
                  } else {
                    // Handle case where it's a flat array of services
                    servicesData = servicesResponse?.data?.data;
                  }
                } else if (typeof servicesResponse?.data?.data === "object") {
                  // Handle object structure if needed
                  servicesData = Object.values(servicesResponse?.data?.data);
                }
              }

              setProducts(productsData);
              setServices(servicesData);
            })
            .catch((error) => {
              console.error("Error refreshing data:", error);
              setError(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
