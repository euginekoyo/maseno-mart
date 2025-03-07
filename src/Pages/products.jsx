import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
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
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { fetchProducts } from "../api/api";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

// Styled component for the puller (the visual indicator at the top of the drawer)
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

  const handleExpandClick = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setFilteredProducts(products);
    } else {
      const categories = ["All", "1", "2", "3", "4", "5", "6"];
      const selectedCategory = categories[newValue];
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

  return (
    <Box sx={{ paddingBottom: "80px" }}>
      {" "}
      {/* Prevent overlap with footer */}
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
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              No products available
            </Typography>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
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
                      {item.name} - {"Service Available"}
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
                      `https://wa.me/${selectedProduct.phoneNumber || "254712345678"}`,
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
      <SimpleBottomNavigation />
    </Box>
  );
}

export default Products;
