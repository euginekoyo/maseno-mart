import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { StickyNote } from "lucide-react";
import { createProduct, createService } from "../../api/api";

// Mock data - could be moved to a constants file
const mockBrands = [
  { _id: "1", name: "Brand New" },
  { _id: "2", name: "Second Hand" },
];

const mockCategories = [
  { _id: "1", name: "Phones, Laptop & Accessories" },
  { _id: "2", name: "Appliances" },
  { _id: "3", name: "Clothes" },
  { _id: "4", name: "Bags" },
  { _id: "5", name: "Home & Kitchen" },
  { _id: "6", name: "Shoes" },
];
const mockCategories2 = [
    { _id: "1", name: "Photography" },
    { _id: "2", name: "Hair Design" },
    { _id: "3", name: "Gaming" },
    { _id: "4", name: "Bike Hire" },
    { _id: "5", name: "Cyber Services" },
    { _id: "6", name: "Fast Foods" },

  ];
  

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
};

const AddProductServiceForms = ({
  selectModalOpen,
  productModalOpen,
  serviceModalOpen,
  handleCloseSelectModal,
  handleCloseProductModal,
  handleCloseServiceModal,
  handleOpenFormModal,
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarOpen,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

  const [productFormData, setProductFormData] = React.useState({
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

  const [serviceFormData, setServiceFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

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
      category: "",
      image: null,
    });
    setFormErrors({});
  };

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

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleServiceFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setServiceFormData((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    }
  };

  const handleProductSubmit = async () => {
    if (!validateForm("product")) return;

    setLoading(true);
    try {
      const submissionData = new FormData();
      Object.entries(productFormData).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => submissionData.append("images", file));
        } else if (value !== null) {
          submissionData.append(key, value);
        }
      });

      await createProduct(submissionData);

      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      handleCloseProductModal();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Failed to add product. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async () => {
    if (!validateForm("service")) return;

    setLoading(true);
    try {
      const submissionData = new FormData();
      Object.entries(serviceFormData).forEach(([key, value]) => {
        if (value !== null) {
          submissionData.append(key, value);
        }
      });

      await createService(submissionData);

      setSnackbarMessage("Service added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      handleCloseServiceModal();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Failed to add service. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Select Modal */}
      <Modal open={selectModalOpen} onClose={handleCloseSelectModal}>
        <Box
          sx={{
            bgcolor: "background.paper",
            position: "absolute",
            top: "30%",
            left: { xs: "49%" },
            px: 4,
            mx: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transform: "translate(-50%, -50%)",
            borderRadius: "18px",
            width: { lg: "40%", xs: "90%" },
            height: { lg: "200px" },
          }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            What would you like to add?
          </Typography>
          <Stack direction={"row"} my={3} spacing={2}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#EA4335", mr: 2, borderRadius: 4 }}
              onClick={() => handleOpenFormModal("product")}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#EA4335", borderRadius: 4 }}
              onClick={() => handleOpenFormModal("service")}
            >
              Add Service
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Product Modal */}
      <Modal open={productModalOpen} onClose={handleCloseProductModal}>
        <Box
          sx={{ ...modalStyle, maxWidth: "800px", bgcolor: "background.paper" }}
        >
          <Typography variant="h6" sx={{ mb: 2, mx: { xs: 11 }, my: 4 }}>
            Add New Product
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <TextField
              fullWidth
              size="small"
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
              size="small"
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
          </Stack>
          <Stack my={2} direction={"row"} spacing={2}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              size="small"
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
              size="small"
              value={productFormData.phoneNumber}
              onChange={handleProductChange}
              sx={{ mb: 2 }}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
              required
            />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              fullWidth
              select
              label="Category"
              size="small"
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
              size="small"
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
              size="small"
              name="stockQuantity"
              type="number"
              value={productFormData.stockQuantity}
              onChange={handleProductChange}
              sx={{ mb: 2 }}
              error={!!formErrors.stockQuantity}
              helperText={formErrors.stockQuantity}
              required
            />
          </Stack>
          <Stack my={2} direction={"row"} spacing={2}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              size="small"
              sx={{ mb: 2, bgcolor: "#EA4335" }}
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
              sx={{ mb: 2, bgcolor: "#EA4335" }}
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
          </Stack>

          <Button
            variant="contained"
            sx={{ bgcolor: "#F1F3F4", width: 300, mx: 4, my: 2 }}
            fullWidth
            onClick={handleProductSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            <Typography fontSize={"1rem"} mx={2}>
              Post
            </Typography>
            <StickyNote />
          </Button>
        </Box>
      </Modal>

      {/* Service Modal */}
      <Modal open={serviceModalOpen} onClose={handleCloseServiceModal}>
        <Box
          sx={{ ...modalStyle, bgcolor: "background.paper", maxWidth: "800px" }}
        >
          <Typography variant="h6" sx={{ mb: 2, mx: 13, my: 2 }}>
            New Service
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Category"
                size="small"
                name="category"
                value={serviceFormData.category}
                onChange={handleServiceChange}
                sx={{ mb: 2 }}
                error={!!formErrors.category}
                helperText={formErrors.category}
                required
              >
                {mockCategories2.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={serviceFormData.price}
                onChange={handleServiceChange}
                size="small"
                sx={{ mb: 2 }}
                error={!!formErrors.price}
                helperText={formErrors.price}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                size="small"
                sx={{ mb: 2, bgcolor: "#EA4335", borderRadius: 4 }}
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                sx={{
                  width: 200,
                  mx: { xs: 11 },
                  borderRadius: 4,
                  my: 2,
                  bgcolor: "#EA4335",
                }}
                onClick={handleServiceSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                <Typography fontSize={"1rem"}>Post Service</Typography>
                <StickyNote />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddProductServiceForms;
