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

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height:10
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 20,
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
    <motion.div whileHover={{ scale: 1.1 }}>
      <Box
        onClick={handleExpandClick} // Open drawer when clicking the card
        sx={{
          width: { lg: "180px", xs: "150px" },
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.main",
          cursor: "pointer",
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
            image={item.images || item.image || "/src/assets/jersey.jpg"}
            alt={item.title || item.name}
          />
        </Box>
        <CardContent sx={{ padding: "5px 10px", flex: "1 0 auto" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 40, overflow: "hidden" }}
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
              onClick={(event) => event.stopPropagation()}
              color="primary"
              size="small"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              onClick={(event) => event.stopPropagation()}
              color="primary"
              size="small"
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={handleWhatsAppClick}
              color="primary"
              size="small"
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
          <IconButton onClick={handleExpandClick} color="primary" size="small">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        {/* Swipeable Drawer */}
        <Root>
          <CssBaseline />
          <SwipeableDrawer
            anchor="bottom"
            open={isExpanded}
            onClose={handleExpandClick}
            onOpen={handleExpandClick}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            keepMounted
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Puller />
            </StyledBox>
            <StyledBox sx={{ px: 2, height: "100%", overflow: "auto" }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Stack direction={{ lg: "row", xs: "column",mt:{lg:3} }} spacing={2}>
                  <Card sx={{ my: 2, borderRadius: 2, ml: { lg: -10 } }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        height: { lg: "300px", xs: "70%" },
                        objectFit: "cover",
                      }}
                      image={
                        item.images || item.image || "/src/assets/jersey.jpg"
                      }
                      alt={item.title || item.name}
                    />
                  </Card>
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <Box
                      sx={{
                        borderRadius: 4,
                        boxShadow: 6,
                        my: { xs: -15, lg: -4 },

                        backgroundColor: "background.paper",
                        mb: 3,
                      }}
                    >
                      <Stack direction="row" sx={{ mx: 0.5 }} spacing={7}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography my={2} mx={1}>
                            {item.title || item.name}
                          </Typography>
                          <IconButton
                            sx={{
                              bgcolor: "green",
                              borderRadius: 2,
                              my: 1,
                              width: 70,
                              height: 20,
                              fontSize: ".7rem",
                            }}
                          >
                            in stock
                          </IconButton>
                        </Box>
                        <Box>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<WhatsAppIcon />}
                            sx={{ mb: 6, mt: 1.5, width: 130 }}
                            onClick={handleWhatsAppClick}
                          >
                            <Typography fontSize="0.6rem">
                              Contact me
                            </Typography>
                          </Button>
                        </Box>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.8rem",
                          color: "text.secondary",
                          mx: 3,
                        }}
                      >
                        {new Date().toDateString()}
                      </Typography>
                      <Typography paragraph sx={{ pl: 2, mt: 2, pb: 4 }}>
                        {item.description || "No description available."}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </StyledBox>
          </SwipeableDrawer>
        </Root>
      </Box>
    </motion.div>
  );
};

export default ProductCard;
