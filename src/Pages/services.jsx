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
  Tab,
  Tabs,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

function Services() {
  const [value, setValue] = React.useState(0);
  const [services, setServices] = React.useState([]);
  const [filteredServices, setFilteredServices] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const [error, setError] = React.useState(null);

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

  const handleExpandClick = (id) => {
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

  return (
    <>
      <Box>
        <Box my={4}>
          <Box
            // component="section"
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
                  fontSize: "13px", // Slightly smaller
                  fontWeight: "500", // Medium weight
                  textTransform: "none",
                  minWidth: "auto", // Removes extra width
                  padding: "6px 12px", // Reduces inner spacing
                },
                "& .MuiTabs-flexContainer": {
                  gap: "4px", // Reduces space between tabs
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
      <Box>
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
                <motion.div
                whileHover={{scale:1.05}}
                >
                  <Box
                    sx={{
                      maxWidth: 350,
                      mx: "auto",
                      borderRadius: 2,
                      mb: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
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
                    <Dialog
                      open={expandedItemId === item._id}
                      onClose={() => handleExpandClick(item._id)}
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
                          onClick={() => handleExpandClick(item._id)}
                          sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <Typography
                          paragraph
                          sx={{ pl: 2, fontWeight: "bold" }}
                        >
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
                          <Avatar
                            sx={{ bgcolor: red[600], width: 40, height: 40 }}
                          >
                            {(item.title || item.name)?.[0]?.toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {item.title || item.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: "0.8rem",
                                color: "text.secondary",
                              }}
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
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
        <SimpleBottomNavigation />
      </Box>
    </>
  );
}

export default Services;
