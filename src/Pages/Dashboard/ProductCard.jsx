import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
  Stack,
  SwipeableDrawer,
  CssBaseline,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ProductCard = ({ item, type = "product" }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpandClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsExpanded(!isExpanded);
  };

  const handleWhatsAppClick = (event) => {
    event.stopPropagation();
    window.open(
      `https://wa.me/${item.phoneNumber || "254712345678"}`,
      "_blank"
    );
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box
        onClick={handleExpandClick} // Open drawer when clicking the card
        sx={{
          width: { lg: "180px", xs: "150px" },
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.paper",
          cursor: "pointer",
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            flex: "0 0 auto",
            bgcolor: "#F1F3F4",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              borderRadius: "8px 8px 0 0",
              height: { lg: "200px", xs: "150px" },
              objectFit: "cover",
            }}
            image={item.images || item.image || "/src/assets/jersey.jpg"}
            alt={item.title || item.name}
          />
        </Box>
        <CardContent sx={{ padding: "8px 12px", flex: "1 0 auto" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 40,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
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
            padding: "8px 12px",
            mt: "auto",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <IconButton
              onClick={(event) => event.stopPropagation()}
              color="primary"
              size="small"
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              onClick={(event) => event.stopPropagation()}
              color="primary"
              size="small"
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={handleWhatsAppClick}
              color="primary"
              size="small"
              aria-label="contact on WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
          <IconButton
            onClick={handleExpandClick}
            color="primary"
            size="small"
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        {/* Swipeable Drawer */}
        <SwipeableDrawer
          anchor="bottom"
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          onOpen={() => setIsExpanded(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              height: { xs: "80%", sm: "70%", md: "60%" },
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              height: drawerBleeding,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Puller />
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              pt: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ mt: 1 }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  width: { xs: "100%", md: "40%" },
                  alignSelf: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    height: { xs: "250px", md: "300px" },
                    objectFit: "cover",
                  }}
                  image={item.images || item.image || "/src/assets/jersey.jpg"}
                  alt={item.title || item.name}
                />
              </Card>

              <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title || item.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "inline-block",
                          bgcolor: "success.main",
                          color: "white",
                          borderRadius: 1,
                          px: 1,
                          py: 0.5,
                          mt: 1,
                          fontSize: "0.75rem",
                        }}
                      >
                        In Stock
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<WhatsAppIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                      onClick={handleWhatsAppClick}
                    >
                      Contact Me
                    </Button>
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 2 }}
                  >
                    {new Date().toDateString()}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    {item.description || "No description available."}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    KSh {item.price}
                  </Typography>
                </Card>
              </Box>
            </Stack>
          </StyledBox>
        </SwipeableDrawer>
      </Box>
    </motion.div>
  );
};

export default ProductCard;
