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

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  function ToolbarActionsSearch() {
    return (
      <Stack direction={"row"} sx={{ mr: { xs: -4 }, my: 4 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            display: { xs: "none", md: "inline-block" },
            mr: { lg: 10, xs: 0.1 },
            mt: { lg: 2 },
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
          <Link to="/login">

          <IconButton
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
            sx={{
              ml: 1,
              mr: 1,
              my: 2,
              borderRadius: 2,
              height: 35,
              width: "4rem",
              bgcolor: "black",
              color: "white",
            }}
          >
            <Typography mx={1}>Logout</Typography>
          </IconButton>
          </Link>
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
