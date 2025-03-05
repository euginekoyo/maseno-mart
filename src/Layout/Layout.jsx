import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Facebook, Instagram, LogIn } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import {jwtDecode} from "jwt-decode"; // ✅ Fixed import

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name);
        setLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setLoggedIn(false);
      }
    }
  }, []);

  function ToolbarActionsSearch() {
    return (
      <Stack direction={"row"} sx={{ mr: { xs: -4 }, my: {lg:2} }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            display: { xs: "none", md: "inline-block" },
            mr: { lg: 10, xs: 0.1 },
   
          }}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="search" size="small" sx={{ borderRadius: 2 }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        {loggedIn ? (
          <Typography fontFamily={"monospace"} fontSize={"1.2rem"} mt={1} sx={{mx:{lg:4}}}>{name}😇</Typography>
        ) : (
          <Link to="/login">
            <IconButton
              sx={{
                ml: 2,
                mr: 2,
                my: 2,
                borderRadius: 2,
                height: 35,
                width: "6rem",
                bgcolor: "black",
                color: "white",
              }}
            >
              <Typography mx={1}>Login</Typography>
              <LogIn size={15} />
            </IconButton>
          </Link>
        )}
        <ThemeSwitcher sx={{ mt: 1 }} />
      </Stack>
    );
  }

  function SidebarFooter({ mini }) {
    return (
      <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
        {mini ? (
          <Stack direction="column" spacing={1} alignItems="center" mb={4}>
            <IconButton><Facebook /></IconButton>
            <IconButton><GoogleIcon /></IconButton>
            <IconButton><Instagram /></IconButton>
            <IconButton><XIcon /></IconButton>
          </Stack>
        ) : (
          <Stack direction="column" alignItems="center" mx={4} mb={2}>
            <Typography>Made with love by devs</Typography>
            <Typography>© {new Date().getFullYear()}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <IconButton><Facebook /></IconButton>
              <IconButton><Instagram /></IconButton>
              <IconButton><GoogleIcon /></IconButton>
              <IconButton><XIcon /></IconButton>
            </Stack>
          </Stack>
        )}
      </Typography>
    );
  }

  SidebarFooter.propTypes = {
    mini: PropTypes.bool,
  };

  SidebarFooter.defaultProps = {
    mini: false,
  };

  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: { xs: "0.95rem", lg: "1.5rem" } }}>
          MasenoMart
        </Typography>
        <Tooltip title="Connected to production">
          <CheckCircleIcon color="primary" fontSize="small" />
        </Tooltip>
      </Stack>
    );
  }

  return (
    <DashboardLayout
      defaultSidebarCollapsed
      slots={{
        appTitle: CustomAppTitle,
        toolbarActions: ToolbarActionsSearch,
        sidebarFooter: SidebarFooter,
      }}
    >
      <Outlet />
    </DashboardLayout>
  );
}

export default Layout;
