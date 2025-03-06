import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Fixed: Removed unused imports
// - CloseIcon
// - Skeleton
// - jwtDecode

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  // Fixed: Replaced non-existent applyStyles with proper theme mode handling
  [theme.breakpoints.up("md")]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.default
        : grey[100],
  },
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  // Fixed: Replaced non-existent applyStyles with proper theme mode handling
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.mode === "dark" ? grey[800] : "#fff",
  },
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  // Fixed: Replaced non-existent applyStyles with proper theme mode handling
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[300],
  },
}));

// Fixed: Corrected ExpandMore styled component with proper props
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ item, type = "product" }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${item.phoneNumber || "254712345678"}`,
      "_blank"
    );
  };

  return (
    <Box
      sx={{
        width: { lg: "280px", xs: "170px" },
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.main",
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
            width: { lg: "280px", xs: "170px" },
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
            onClick={handleWhatsAppClick}
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

      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(90% - ${drawerBleeding}px)`, // Default for mobile
              overflow: "visible",
              "@media (min-width: 1200px)": {
                height: `calc(50% - ${drawerBleeding}px)`, // For lg screens
              },
            },
          }}
        />
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
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
          </StyledBox>
          <StyledBox sx={{ px: 2,  height: "100%", overflow: "auto" }}>
            <Box
              sx={{
                alignItems: "center",
                display: { xs: "flex" },
                flexDirection: { xs: "column" },
                gap: 1,
              }}
            >
              <Card sx={{ my: { xs: 2 }, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: { lg: "280px", xs: "100%" },
                    borderRadius: 2,
                    height: { lg: "200px", xs: "70%" },
                    objectFit: "cover",
                  }}
                  image={item.images || item.image || "/src/assets/jersey.jpg"}
                  alt={item.title || item.name}
                />
              </Card>
              <Box sx={{width:{xs:"100%"},height:{xs:"200%"}}}>
                <Box sx={{ borderRadius:4, boxShadow: 6 }}>
                  <Typography variant="subtitle1" mx={2} fontWeight={600}>
                    {item.title || item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    mx={2}
                    sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                  >
                    {new Date().toDateString()}
                  </Typography>
                  <Typography paragraph sx={{ pl: 2, mt: 2 }}>
                    {item.description || "No description available."}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      mb: 6,
                      display: "flex",
                      justifyContent: "center",
                      mx: "auto",
                    }}
                    onClick={handleWhatsAppClick}
                  >
                    Contact me
                  </Button>
                </Box>
              </Box>
            </Box>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </Box>
  );
};

ProductCard.propTypes = {
  // Fixed: Added proper prop types validation
  item: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    images: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(["product", "service"]),
  window: PropTypes.func,
};

export default ProductCard;
