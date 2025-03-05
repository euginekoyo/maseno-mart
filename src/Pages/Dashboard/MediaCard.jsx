import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  Box,
  Button,
  Tabs,
  Tab,
  Modal,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HandymanIcon from "@mui/icons-material/Handyman";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SellIcon from "@mui/icons-material/Sell";
import { StickyNote } from "lucide-react";
import {
  fetchProducts,
  fetchServices,
  createProduct,
  createService,
} from "../../api/api";
import { jwtDecode } from "jwt-decode";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));
const mockBrands = [
  { _id: "1", name: "Brand New" },
  { _id: "2", name: "Second Hand" },
];
const mockCategories = [
  { _id: "1", name: "Phones ,Laptop & Accessories" },
  { _id: "2", name: "Appliances" },
  { _id: "3", name: "Clothes" },
  { _id: "4", name: "Bags" },
  { _id: "5", name: "Home & Kitchen" },
  { _id: "6", name: "Shoes" },
];

export default function ProductsAndServicesPage() {
  const [products, setProducts] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [seller, setSeller] = React.useState("");
  const [selectModalOpen, setSelectModalOpen] = React.useState(false);
  const [productModalOpen, setProductModalOpen] = React.useState(false);
  const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

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
    image: null,
  });

  const [formErrors, setFormErrors] = React.useState({});

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

  React.useEffect(() => {
    const getData = async () => {
      try {
        const productsResponse = await fetchProducts();
        const servicesResponse = await fetchServices();

        console.log("Products Response:", productsResponse);
        console.log("Services Response:", servicesResponse);

        setProducts(productsResponse.data.products);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    getData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setExpandedItemId(null);
  };

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

      setServiceFormData({
        name: "",
        description: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      setSnackbarMessage("Failed to add service. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

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

  const renderItemCard = (item, type) => {
    const isExpanded = expandedItemId === item._id;

    const handleExpandClick = () => {
      setExpandedItemId(isExpanded ? null : item._id);
    };

    return (
      <Grid mt={4} px={0.5} xs={6} sm={6} md={4} lg={3} key={item._id}>
        <Box
          sx={{
            maxWidth: "100%",
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.main",
          }}
        >
          <Box sx={{ position: "relative", flex: "0 0 auto" }}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                borderRadius: 2,
                height: "130px",
                objectFit: "cover",
              }}
              image={item.images || item.image || "/src/assets/jersey.jpg"}
              alt={item.title || item.name}
            />
          </Box>
          <CardContent sx={{ padding: "5px 10px", flex: "1 0 auto" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                height: 40,
              }}
            >
              {item.title || item.name} -{" "}
              {type === "product" ? "Free Delivery" : "Service Available"}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mt: 1, color: "primary.main" }}
            >
              KSh {item.price}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              padding: "8px 11px",
              mt: "auto",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <IconButton
                aria-label="add to favorites"
                color="primary"
                size="small"
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share" color="primary" size="small">
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="whatsapp"
                color="primary"
                size="small"
                onClick={() =>
                  window.open(
                    `https://wa.me/${item.phoneNumber || "254712345678"}`,
                    "_blank"
                  )
                }
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
            <ExpandMore
              expand={isExpanded}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label="show more"
              color="primary"
              size="small"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Dialog
            open={isExpanded}
            onClose={handleExpandClick}
            maxWidth="sm"
            fullWidth
          >
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                position: "relative",
              }}
            >
              <IconButton
                onClick={handleExpandClick}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography paragraph sx={{ pl: 2, fontWeight: "bold" }}>
                Details:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pl: 2,
                }}
              >
                <Avatar sx={{ bgcolor: red[600], width: 40, height: 40 }}>
                  {(item.title || item.name)?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.title || item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                  >
                    {new Date().toDateString()}
                  </Typography>
                </Box>
              </Box>
              <Typography paragraph sx={{ pl: 2, mt: 2 }}>
                {item.description || "No description available."}
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  mx: "auto",
                }}
                onClick={() =>
                  window.open(
                    `https://wa.me/${item.phoneNumber || "254712345678"}`,
                    "_blank"
                  )
                }
              >
                Contact me
              </Button>
            </Box>
          </Dialog>
        </Box>
      </Grid>
    );
  };

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
                sx={buttonStyle}
                onClick={filter.action || undefined}
              >
                {filter.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {products.length === 0 && services.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No products or services available
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {activeTab === 0 &&
            [...products, ...services].map((item) =>
              renderItemCard(item, item.price ? "product" : "service")
            )}
          {activeTab === 1 &&
            products.map((product) => renderItemCard(product, "product"))}
          {activeTab === 2 &&
            services.map((service) => renderItemCard(service, "service"))}
        </Grid>
      )}

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
          >
            <Typography fontSize={"1rem"}>Post</Typography>
            <StickyNote />
          </Button>
        </Box>
      </Modal>

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
        </Box>
      </Modal>

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
};
