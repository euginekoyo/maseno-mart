import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HandymanIcon from "@mui/icons-material/Handyman";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SellIcon from "@mui/icons-material/Sell";
import { jwtDecode } from "jwt-decode";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createProduct, createService } from "../../api/api";
// Mock data (replace with actual API calls)
const mockCategories = [
  { _id: "1", name: "Electronics" },
  { _id: "2", name: "Clothing" },
  { _id: "3", name: "Home & Garden" },
];

const mockBrands = [
  { _id: "1", name: "Apple" },
  { _id: "2", name: "Samsung" },
  { _id: "3", name: "Nike" },
];


const ProductServiceComponent = () => {
  // State management
  const [seller, setSeller] = useState("");
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Form data state for product
  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    price: "",
    phoneNumber: "",
    category: "",
    brand: "",
    stockQuantity: "",
    thumbnail: null,
    images: [],
  });

  // Form data state for service
  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  // Validation state
  const [formErrors, setFormErrors] = useState({});

  // Fetch user role from token
  useEffect(() => {
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

  // Modal handlers
  const handleOpenSelectModal = () => setSelectModalOpen(true);
  const handleCloseSelectModal = () => setSelectModalOpen(false);

  const handleOpenFormModal = (type) => {
    setSelectModalOpen(false);
    if (type === "product") setProductModalOpen(true);
    else setServiceModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
    resetForm();
  };

  const handleCloseServiceModal = () => {
    setServiceModalOpen(false);
    resetForm();
  };

  // Form validation
  const validateForm = (formType) => {
    const errors = {};

    if (formType === "product") {
      if (!productFormData.title.trim()) errors.title = "Title is required";
      if (!productFormData.description.trim())
        errors.description = "Description is required";

      const priceNum = parseFloat(productFormData.price);
      if (isNaN(priceNum) || priceNum <= 0)
        errors.price = "Valid price is required";

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(productFormData.phoneNumber))
        errors.phoneNumber = "Invalid phone number";

      if (!productFormData.category) errors.category = "Category is required";
      if (!productFormData.brand) errors.brand = "Brand is required";
      if (!productFormData.stockQuantity)
        errors.stockQuantity = "Stock quantity is required";

      if (!productFormData.thumbnail)
        errors.thumbnail = "Thumbnail is required";
      if (productFormData.images.length === 0)
        errors.images = "At least one image is required";
    } else {
      if (!serviceFormData.name.trim()) errors.name = "Name is required";
      if (!serviceFormData.description.trim())
        errors.description = "Description is required";

      const priceNum = parseFloat(serviceFormData.price);
      if (isNaN(priceNum) || priceNum <= 0)
        errors.price = "Valid price is required";

      if (!serviceFormData.image) errors.image = "Image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Input change handler for product
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Input change handler for service
  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File upload handler for product
  const handleProductFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "thumbnail") {
        setProductFormData((prev) => ({
          ...prev,
          thumbnail: files[0] || null,
        }));
      } else if (name === "images") {
        setProductFormData((prev) => ({
          ...prev,
          images: Array.from(files),
        }));
      }
    }
  };

  // File upload handler for service
  const handleServiceFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setServiceFormData((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    }
  };

  // Form submission handler for product
  const handleProductSubmit = async () => {
    if (!validateForm("product")) return;

    setLoading(true);
    try {
      // Create FormData for API submission
      const submissionData = new FormData();
      Object.entries(productFormData).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => submissionData.append("images", file));
        } else if (value !== null) {
          submissionData.append(key, value);
        }
      });

      // API call to create product
      await createProduct(submissionData);

      // Show success message
      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Close modal and reset form
      handleCloseProductModal();

      // Reset form state
      setProductFormData({
        title: "",
        description: "",
        price: "",
        phoneNumber: "",
        category: "",
        brand: "",
        stockQuantity: "",
        thumbnail: null,
        images: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      setSnackbarMessage("Failed to add product. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler for service
  const handleServiceSubmit = async () => {
    if (!validateForm("service")) return;

    setLoading(true);
    try {
      // Create FormData for API submission
      const submissionData = new FormData();
      Object.entries(serviceFormData).forEach(([key, value]) => {
        if (value !== null) {
          submissionData.append(key, value);
        }
      });

      // API call to create service
      await createService(submissionData);

      // Show success message
      setSnackbarMessage("Service added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Close modal and reset form
      handleCloseServiceModal();

      // Reset form state
      setServiceFormData({
        name: "",
        description: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      setSnackbarMessage("Failed to add service. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setProductFormData({
      title: "",
      description: "",
      price: "",
      phoneNumber: "",
      category: "",
      brand: "",
      stockQuantity: "",
      thumbnail: null,
      images: [],
    });
    setServiceFormData({
      name: "",
      description: "",
      price: "",
      image: null,
    });
    setFormErrors({});
  };

  // Filter buttons configuration
  const filters = [
    ...(seller === "seller"
      ? [
          {
            label: "Add Product",
            icon: <DeliveryDiningIcon fontSize="small" />,
            action: handleOpenSelectModal,
          },
        ]
      : []),
    { label: "Brand New", icon: <ShoppingBagIcon fontSize="small" /> },
    { label: "Free Delivery", icon: <LocalShippingIcon fontSize="small" /> },
    { label: "2nd Hand", icon: <SellIcon fontSize="small" /> },
    { label: "Services", icon: <HandymanIcon fontSize="small" /> },
  ];

  return (
    <>
      {/* Filter Buttons Section */}
      <Box component="section" sx={boxStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {filters.map((filter, index) => (
            <Grid item key={index} xs={6} sm={4} md={2.2} lg={2}>
              <Button
                variant="contained"
                startIcon={filter.icon}
                sx={buttonStyle}
                onClick={filter.action || undefined}
              >
                {filter.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Select Modal */}
      <Modal open={selectModalOpen} onClose={handleCloseSelectModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            What would you like to add?
          </Typography>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => handleOpenFormModal("product")}
          >
            Add Product
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenFormModal("service")}
          >
            Add Service
          </Button>
        </Box>
      </Modal>

      {/* Product Modal */}
      <Modal open={productModalOpen} onClose={handleCloseProductModal}>
        <Box sx={{ ...modalStyle, maxWidth: "500px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Product
          </Typography>

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={productFormData.title}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.title}
            helperText={formErrors.title}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={productFormData.description}
            multiline
            rows={3}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.description}
            helperText={formErrors.description}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={productFormData.price}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.price}
            helperText={formErrors.price}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={productFormData.phoneNumber}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
            required
          />

          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={productFormData.category}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.category}
            helperText={formErrors.category}
            required
          >
            {mockCategories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Brand"
            name="brand"
            value={productFormData.brand}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.brand}
            helperText={formErrors.brand}
            required
          >
            {mockBrands.map((brand) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={productFormData.stockQuantity}
            onChange={handleProductChange}
            sx={{ mb: 2 }}
            error={!!formErrors.stockQuantity}
            helperText={formErrors.stockQuantity}
            required
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            error={!!formErrors.thumbnail}
          >
            Upload Thumbnail
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              hidden
              onChange={handleProductFileChange}
            />
          </Button>

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            error={!!formErrors.images}
          >
            Upload Images
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              hidden
              onChange={handleProductFileChange}
            />
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProductSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          ></Button>
          {loading ? "Submitting..." : "Post Product"}
        </Box>
      </Modal>

      {/* Service Modal */}
      <Modal open={serviceModalOpen} onClose={handleCloseServiceModal}>
        <Box sx={{ ...modalStyle, maxWidth: "800px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Service
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={serviceFormData.name}
                  onChange={handleServiceChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
              
            </Grid>
            <Grid size={6}>
             
          
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={serviceFormData.description}
                  multiline
                  rows={3}
                  onChange={handleServiceChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                />
              
            </Grid>
            <Grid size={6}>
             
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={serviceFormData.price}
                  onChange={handleServiceChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  required
                />
              
            </Grid>
            <Grid size={6}>
              
                {" "}
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!formErrors.image}
                >
                  Upload Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={handleServiceFileChange}
                  />
                </Button>
              
            </Grid>
          </Grid>  

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleServiceSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Submitting..." : "Post Service"}
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Styling Constants
const boxStyle = {
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  p: 2,
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
};

export default ProductServiceComponent;
