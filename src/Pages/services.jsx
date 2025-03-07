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
  Box,
  Button,
  Tab,
  Tabs,
  SwipeableDrawer,
  Divider,
  Chip,
  Rating,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchServices } from "../api/api";
import { motion } from "framer-motion";
import {
  Camera,
  Bath,
  Utensils,
  Bike,
  Gamepad2,
  Computer,
  FlameKindling,
} from "lucide-react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BuildIcon from "@mui/icons-material/Build";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useMediaQuery from "@mui/material/useMediaQuery";
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

function Services() {
  const { category } = useParams();
  const [value, setValue] = React.useState(0);
  const [services, setServices] = React.useState([]);
  const [filteredServices, setFilteredServices] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const limit = 10;

  React.useEffect(() => {
    const getData = async () => {
      try {
        const servicesResponse = await fetchServices({ page, limit });
        console.log(servicesResponse);
        console.log("Services Response:", servicesResponse.data.data);
        setTotalPages(servicesResponse?.data?.data.totalPages);
        let extractedServices = [];
        if (servicesResponse) {
          if (Array.isArray(servicesResponse?.data?.data)) {
            extractedServices = servicesResponse?.data?.data.map((service) => ({
              ...service,
              title: service.name,
              images: service.image,
            }));
          } else if (
            servicesResponse?.data?.data &&
            Array.isArray(servicesResponse?.data?.data)
          ) {
            extractedServices = servicesResponse?.data?.data.map((service) => ({
              ...service,
              title: service.name,
              images: service.image,
            }));
          }
        }
        console.log("Extracted Services:", extractedServices);
        setServices(extractedServices);
        setFilteredServices(extractedServices);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    getData();
  }, [page]);

  React.useEffect(() => {
    if (category) {
      setFilteredServices(
        services.filter((service) => service.category === category)
      );
    } else {
      setFilteredServices(services);
    }
    setPage(1); // Reset page to 1 when category changes
  }, [category, services]);

  const handleExpandClick = (id, event) => {
    event.stopPropagation();
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const categories = ["All", "1", "2", "3", "4", "5", "6"];
    const selectedCategory = categories[newValue];
    if (selectedCategory === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((service) => service.category === selectedCategory)
      );
    }
    setPage(1); // Reset page to 1 when tab changes
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
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

  const getCategoryIcon = (categoryId) => {
    const icons = [
      <Bath size={24} />,
      <Camera size={24} />,
      <FlameKindling size={24} />,
      <Gamepad2 size={24} />,
      <Bike size={24} />,
      <Computer size={24} />,
      <Utensils size={24} />,
    ];
    return icons[categoryId] || icons[0];
  };

  const getCategoryName = (categoryId) => {
    const categories = [
      "All Services",
      "Photography",
      "Hair Design",
      "Gaming",
      "Bike Hire",
      "Cyber Services",
      "Fast Foods",
    ];
    return categories[categoryId] || "Uncategorized";
  };

  const screen = useMediaQuery("(min-width:768px)");

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <>
      <Box>
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
              <Tab label="Photography" />
              <Tab label="Hair Design" />
              <Tab label="Gaming" />
              <Tab label="Bike Hire" />
              <Tab label="Cyber Services" />
              <Tab label="Fast Foods" />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box sx={{ px: 2, pb: "80px" }}>
        <Grid container spacing={2}>
          {filteredServices.length === 0 ? (
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ my: { xs: 20 } }}
            >
              <Typography variant="h6" color="textSecondary" align="center">
                <BlinkBlur color="#5ea7d9" size="medium" text="" textColor="" />
              </Typography>
            </Grid>
          ) : (
            filteredServices.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={2} key={item._id}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box
                    sx={{
                      maxWidth: 350,
                      mx: "auto",
                      borderRadius: 2,
                      mb: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => handleServiceClick(item)}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/${item.phoneNumber || "254712345678"}`,
                              "_blank"
                            );
                          }}
                        >
                          <WhatsAppIcon />
                        </IconButton>
                      </Box>
                      <ExpandMore
                        expand={expandedItemId === item._id}
                        onClick={(e) => handleExpandClick(item._id, e)}
                        aria-expanded={expandedItemId === item._id}
                        aria-label="show more"
                        color="primary"
                        size="small"
                      >
                        {/* <ExpandMoreIcon /> */}
                      </ExpandMore>
                    </CardActions>
                  </Box>
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <ReactPaginate
            previousLabel={"<<  "}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            breakClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakLinkClassName={"page-link"}
          />
        </Box>
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
      {/* Swipeable Drawer for Service Details */}
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
          {selectedService && (
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
                  Service Details
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {/* Service Header */}
              <Box sx={{ mb: 3 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    height: { xs: "200px", sm: "250px" },
                    objectFit: "cover",
                    mb: 2,
                  }}
                  image={
                    selectedService.images ||
                    selectedService.image ||
                    "/src/assets/jersey.jpg"
                  }
                  alt={selectedService.title || selectedService.name}
                />
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}
                >
                  <Avatar sx={{ bgcolor: red[600], width: 50, height: 50 }}>
                    {(selectedService.title ||
                      selectedService.name)?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {selectedService.title || selectedService.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedService.provider ||
                        "Professional Service Provider"}
                    </Typography>
                  </Box>
                  {screen ? (
                    <Box
                      sx={{ display: "flex", gap: 1, mt: 3, ml: { lg: 100 } }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<WhatsAppIcon />}
                        onClick={() =>
                          window.open(
                            `https://wa.me/${selectedService.phoneNumber || "254712345678"}`,
                            "_blank"
                          )
                        }
                        size="small"
                        sx={{
                          width: 150,
                          fontSize: "0.5rem",
                        }}
                        fullWidth
                      >
                        Contact
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{ display: "flex", gap: 1, mt: 3, ml: { lg: 20 } }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<WhatsAppIcon />}
                        onClick={() =>
                          window.open(
                            `https://wa.me/${selectedService.phoneNumber || "254712345678"}`,
                            "_blank"
                          )
                        }
                        size="small"
                        sx={{
                          width: { lg: 200, xs: 120 },
                          fontSize: { xs: "0.7rem" },
                        }}
                        fullWidth
                      >
                        Contact
                      </Button>
                    </Box>
                  )}
                </Box>
                {/* Action Buttons */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  <Chip
                    icon={getCategoryIcon(selectedService.category)}
                    label={getCategoryName(selectedService.category)}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocationOnIcon />}
                    label={selectedService.location || "Nairobi, Kenya"}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={selectedService.rating || 4.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {selectedService.rating || 4.5}/5 (
                    {selectedService.reviews || 24} reviews)
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  color="primary.main"
                  fontWeight={700}
                  sx={{ mb: 2 }}
                >
                  KSh {selectedService.price}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {/* Service Description */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {selectedService.description ||
                    "This service is provided by professionals with years of experience in the field. We guarantee customer satisfaction and high-quality results. Contact us to book or inquire about specific requirements and availability."}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {/* Service Details */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Service Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CalendarMonthIcon color="primary" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        Availability
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedService.availability ||
                          "Monday to Saturday, 8:00 AM - 6:00 PM"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <PersonIcon color="primary" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        Service Provider
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedService.provider ||
                          "Professional with 5+ years of experience"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocationOnIcon color="primary" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        Location
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedService.location ||
                          "Available in Nairobi and surrounding areas"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Services;
