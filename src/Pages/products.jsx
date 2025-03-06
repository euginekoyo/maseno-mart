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
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { fetchProducts } from "../api/api";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

function Products() {
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [expandedItemId, setExpandedItemId] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const productResponse = await fetchProducts();
        console.log("Response:", productResponse); // Debugging output

        // Ensure response is in expected format
        if (Array.isArray(productResponse.data)) {
          setProducts(productResponse.data);
        } else if (
          productResponse.data &&
          Array.isArray(productResponse.data.products)
        ) {
          setProducts(productResponse.data.products);
        } else {
          setProducts([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]); // Ensure it's always an array
      }
    };

    getData();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  // If no products, show "No product available" message
  if (products.length === 0) {
    return (
      <Grid item xs={12}>
        <Typography variant="h6" color="textSecondary" align="center">
          No product available
        </Typography>
      </Grid>
    );
  }

  return (
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
            onChange={(event, newValue) => setValue(newValue)}
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
            <Tab label="All" />
            <Tab label="Electronics" />
            <Tab label="Shoes" />
            <Tab label="Cyber Services" />
            <Tab label="Clothes" />
            <Tab label="Appliances" />
          </Tabs>
        </Box>
      </Box>
      <Box mx={2}>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  maxWidth: 350,
                  mx: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                  mb: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ position: "relative", flex: "0 0 auto" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 300,
                      objectFit: "cover",
                    }}
                    image={item.images || "/default-placeholder.jpg"}
                    alt={item.title}
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
                        {item.title[0]?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.title}
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Products;
