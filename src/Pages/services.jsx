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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import useMediaQuery from "@mui/material/useMediaQuery";

function Services() {
  const [value, setValue] = React.useState(0);
  const [services, setServices] = React.useState([]);
  const [filteredServices, setFilteredServices] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const servicesResponse = await fetchServices();
        console.log("Services Response:", servicesResponse);

        let extractedServices = [];
        if (servicesResponse) {
          if (Array.isArray(servicesResponse)) {
            extractedServices = servicesResponse.map((service) => ({
              ...service,
              title: service.name,
              images: service.image,
            }));
          } else if (
            servicesResponse.data &&
            Array.isArray(servicesResponse.data)
          ) {
            extractedServices = servicesResponse.data.map((service) => ({
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
  }, []);

  const handleExpandClick = (id, event) => {
    event.stopPropagation();
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setFilteredServices(services);
    } else {
      const categories = ["All", "1", "2", "3", "4", "5", "6"];
      const selectedCategory = categories[newValue];
      setFilteredServices(
        services.filter((service) => service.category === selectedCategory)
      );
    }
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

  return (
    <>
      <Box>
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
              <Tab label="All" icon={<Bath size={20} />} />
              <Tab label="Photography" icon={<Camera size={20} />} />
              <Tab label="Hair Design" icon={<FlameKindling size={20} />} />
              <Tab label="Gaming" icon={<Gamepad2 size={20} />} />
              <Tab label="Bike Hire" icon={<Bike size={20} />} />
              <Tab label="Cyber Services" icon={<Computer size={20} />} />
              <Tab label="Fast Foods" icon={<Utensils size={20} />} />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box></Box>
      <Box sx={{ px: 2, pb: "80px" }}>
        <Grid container spacing={2}>
          {filteredServices.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center">
                No services available
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
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                  </Box>
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
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
                          fontSize: { xs: "0.7rem" }, // Fix fontSize nesting
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

      <SimpleBottomNavigation />
    </>
  );
}

export default Services;
