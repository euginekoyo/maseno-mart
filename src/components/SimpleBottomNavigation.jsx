import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BuildIcon from "@mui/icons-material/Build";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <>
     
      {/* Fixed Bottom Navigation */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
          display: { xs: "flex", md: "none" }, // Only visible on mobile & tablets
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
          {/* Centered Add Button */}
          <BottomNavigationAction
            label="Add"
            icon={<AddCircleIcon sx={{ fontSize: 40, color: "primary.main" }} />}
            sx={{ position: "relative", top: -10 }} // Slightly lifted
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
    </>
  );
}
