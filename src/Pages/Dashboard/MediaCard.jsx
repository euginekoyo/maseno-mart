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
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { fetchProducts, fetchServices } from "../../api/api";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export default function RecipeReviewCard() {
  const [products, setProducts] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [expandedProductId, setExpandedProductId] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const [productsResponse, servicesResponse] = await Promise.all([
          fetchProducts(),
          fetchServices(),
        ]);
    
        console.log("Products Response:", productsResponse);
        console.log("Services Response:", servicesResponse);
    
        if (Array.isArray(productsResponse.data.products)) {
          setProducts(productsResponse.data.products);
        } else {
          setProducts([]);
        }
    
        if (Array.isArray(servicesResponse.data.services)) {
          setServices(servicesResponse.data.services);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setProducts([]);
        setServices([]);
      }
    };
    
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {Array.isArray(products) && products.length === 0 && Array.isArray(services) && services.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No products or services available
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => {
            const isExpanded = expandedProductId === product._id;

            const handleExpandClick = () => {
              setExpandedProductId(isExpanded ? null : product._id);
            };

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  sx={{
                    maxWidth: 350,
                    mx: "auto",
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 300,
                        objectFit: "cover",
                      }}
                      image={product.images || "/src/assets/jersey.jpg"} // Fallback image if product.image is undefined
                      alt={product.title}
                    />
                  </Box>
                  <CardContent sx={{ padding: "5px 10px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.title} - Free Delivery
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mt: 1, color: "primary.main" }}
                    >
                      KSh {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ padding: "8px 11px" }}>
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
                        window.open(`https://wa.me/254712345678`, "_blank")
                      }
                    >
                      <WhatsAppIcon />
                    </IconButton>
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
                  <Dialog open={isExpanded} onClose={handleExpandClick}>
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
                        <Avatar
                          sx={{ bgcolor: red[600], width: 40, height: 40 }}
                        >
                          {product.title[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {product.title}
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
                        {product.description || "No description available."}
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
                          window.open(`https://wa.me/254712345678`, "_blank")
                        }
                      >
                        Contact me
                      </Button>
                    </Box>
                  </Dialog>
                </Card>
              </Grid>
            );
          })}
          {services.map((service) => {
            const isExpanded = expandedProductId === service._id;

            const handleExpandClick = () => {
              setExpandedProductId(isExpanded ? null : service._id);
            };

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                <Card
                  sx={{
                    maxWidth: 350,
                    mx: "auto",
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 300,
                        objectFit: "cover",
                      }}
                      image={service.images || "/src/assets/jersey.jpg"} // Fallback image if service.image is undefined
                      alt={service.title}
                    />
                  </Box>
                  <CardContent sx={{ padding: "5px 10px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.title} - Free Delivery
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mt: 1, color: "primary.main" }}
                    >
                      KSh {service.price}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ padding: "8px 11px" }}>
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
                        window.open(`https://wa.me/254712345678`, "_blank")
                      }
                    >
                      <WhatsAppIcon />
                    </IconButton>
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
                  <Dialog open={isExpanded} onClose={handleExpandClick}>
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
                        <Avatar
                          sx={{ bgcolor: red[600], width: 40, height: 40 }}
                        >
                          {service.title[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {service.title}
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
                        {service.description || "No description available."}
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
                          window.open(`https://wa.me/254712345678`, "_blank")
                        }
                      >
                        Contact me
                      </Button>
                    </Box>
                  </Dialog>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
