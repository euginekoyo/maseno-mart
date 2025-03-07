import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BuildIcon from "@mui/icons-material/Build";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { BlinkBlur } from "react-loading-indicators";
import CarouselComponent from "./Dashboard/CarouselComponent";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)",
  borderRadius: 3,
  margin: "8px auto",
}));

function Products() {
  const { category } = useParams();
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const productResponse = await fetchProducts();
        if (Array.isArray(productResponse.data)) {
          setProducts(productResponse.data);
          setFilteredProducts(productResponse.data);
        } else if (
          productResponse.data &&
          Array.isArray(productResponse.data.products)
        ) {
          setProducts(productResponse.data.products);
          setFilteredProducts(productResponse.data.products);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const handleExpandClick = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const categories = ["All", "1", "2", "3", "4", "5", "6"];
    const selectedCategory = categories[newValue];
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const getCategoryName = (categoryId) => {
    const categories = [
      "All",
      "Phones, Laptops & Accessories",
      "Appliances",
      "Clothes",
      "Bags",
      "Home & Kitchen",
      "Shoes",
    ];
    return categories[categoryId] || "Uncategorized";
  };

  const formatPhoneNumber = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.startsWith("0")) {
      return `254${digitsOnly.slice(1)}`;
    }
    return digitsOnly;
  };

  const generateWhatsAppLink = (phoneNumber) => {
    const formattedNumber = formatPhoneNumber(phoneNumber || "254712345678");
    return `https://wa.me/${formattedNumber}`;
  };

  return (
    <Box my={10}>
      <CarouselComponent />
      <Box my={4}>
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", lg: "40%" },
            mx: { lg: 45, md: 30 },
            mt: -2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            indicatorColor="primary"
            textColor="primary"
            sx={{
              "& .MuiTab-root": {
                fontSize: "13px",
                fontWeight: "500",
                textTransform: "none",
                minWidth: "auto",
                padding: "6px 12px",
              },
              "& .MuiTabs-flexContainer": {
                gap: "4px",
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Phones, Laptops & Accessories" />
            <Tab label="Appliances" />
            <Tab label="Clothes" />
            <Tab label="Bags" />
            <Tab label="Home & Kitchen" />
            <Tab label="Shoes" />
          </Tabs>
        </Box>
      </Box>
      <Box mx={2}>
        {filteredProducts.length === 0 ? (
          <Grid item xs={12} sx={{ my: { xs: 20 } }}>
            <Typography variant="h6" color="textSecondary" align="center">
              <BlinkBlur color="#5ea7d9" size="medium" text="" textColor="" />
            </Typography>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={2} key={item._id}>
                <Box
                  sx={{
                    maxWidth: 350,
                    mx: "auto",
                    borderRadius: 2,
                    position: "relative",
                    flex: "0 0 auto",
                    backgroundColor: "background.main",
                    mb: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(item)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      flex: "0 0 auto",
                      bgcolor: "#F1F3F4",
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        height: { lg: "200px", xs: "150px" },
                        objectFit: "cover",
                      }}
                      image={
                        item.images || item.image || "/src/assets/jersey.jpg"
                      }
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
                      {item.title} -{" "}
                      <Chip
                        label="in stock"
                        size="small"
                        color="primary"
                        sx={{ fontSize: ".5rem", width: 50, height: 15 }}
                      />
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Box>
                      <IconButton
                        aria-label="add to favorites"
                        color="primary"
                        size="small"
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="share"
                        color="primary"
                        size="small"
                      >
                        <ShareIcon />
                      </IconButton>

                      <IconButton
                        aria-label="whatsapp"
                        color="success"
                        size="small"
                        onClick={() =>
                          window.open(
                            generateWhatsAppLink(selectedProduct.phoneNumber),
                            "_blank"
                          )
                        }
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </Box>
                    <ExpandMore
                      expand={expandedItemId === item._id}
                      onClick={() => handleExpandClick(item._id)}
                      aria-expanded={expandedItemId === item._id}
                      aria-label="show more"
                      color="primary"
                      size="small"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {/* Swipeable Drawer for Product Details */}
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        swipeAreaWidth={56}
        ModalProps={{
          keepMounted: true,
        }}
        BackdropProps={{
          onClick: toggleDrawer(false),
        }}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
            zIndex: 1200,
          },
        }}
      >
        <Box sx={{ padding: 2 }} onClick={toggleDrawer(false)}>
          <Puller />
          {selectedProduct && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Product Details
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    flex: { sm: "0 0 40%" },
                    bgcolor: "#F1F3F4",
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      height: { xs: "200px", sm: "250px" },
                      objectFit: "cover",
                    }}
                    image={
                      selectedProduct.images ||
                      selectedProduct.image ||
                      "/src/assets/jersey.jpg"
                    }
                    alt={selectedProduct.title || selectedProduct.name}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {selectedProduct.name}
                  </Typography>

                  <Chip
                    label={getCategoryName(selectedProduct.category)}
                    size="small"
                    sx={{ mb: 2 }}
                    color="primary"
                    variant="outlined"
                  />

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    sx={{ mb: 2 }}
                  >
                    KSh {selectedProduct.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {selectedProduct.description ||
                      "This product is currently available for purchase. Contact the seller for more details about specifications, delivery options, and warranty information."}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip
                      icon={<LocalShippingIcon />}
                      label="Free Delivery"
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label="In Stock"
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List>
                <ListItem>
                  <ListItemText
                    primary="Seller"
                    secondary={selectedProduct.seller || "Official Store"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Location"
                    secondary={selectedProduct.location || "Nairobi, Kenya"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Condition"
                    secondary={selectedProduct.condition || "New"}
                  />
                </ListItem>
              </List>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<WhatsAppIcon />}
                  onClick={() =>
                    window.open(
                      generateWhatsAppLink(selectedProduct.phoneNumber),
                      "_blank"
                    )
                  }
                  fullWidth
                >
                  Contact Seller
                </Button>
              </Box>
            </>
          )}
        </Box>
      </SwipeableDrawer>
      {/* Fixed Bottom Navigation */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1300,
          backgroundColor: "white",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
          display: { xs: "flex", md: "none" },
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ width: "100%" }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/products"
            label="Products"
            icon={<ShoppingCartIcon />}
          />
          <BottomNavigationAction
            label="Add"
            icon={
              <AddCircleIcon sx={{ fontSize: 40, color: "primary.main" }} />
            }
            sx={{ position: "relative", top: -10 }}
          />
          <BottomNavigationAction
            component={Link}
            to="/services"
            label="Services"
            icon={<BuildIcon />}
          />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}

export default Products;
