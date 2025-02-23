import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Facebook,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import { SignInButton } from "@toolpad/core/Account";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
function Layout() {
  function ToolbarActionsSearch() {
    return (
      <Stack direction={"row"} sx={{ mr: { xs: -4 }, my: 4 }}>
        <Tooltip title="Search" sxenterDelay={1000}>
          <div style={{ marginTop: 12 }}>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: "inline", md: "none", borderRadius: 4 },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  type="button"
                  aria-label="search"
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{
            display: { xs: "none", md: "inline-block" },
            mr: { lg: 10, xs: 0.1 },
            mt: { lg: 2 },
          }}
        />
        <IconButton
          sx={{
            ml: { lg: 2, xs: 0.5 },
            mr: { lg: 2, xs: 0.1 },
            my: 2,
            borderRadius: 2,
            height: 35,
            width: { xs: "4rem" },
            bgcolor: "black",
            color: "white",
          }}
        >
          <SignInButton color="black" />
        </IconButton>
        <div style={{ marginTop: 12, marginRight: { lg: 2, xs: -4 } }}>
          <ThemeSwitcher />
        </div>
      </Stack>
    );
  }

  function SidebarFooter({ mini }) {
    return (
      <Typography
        variant="caption"
        sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
      >
        {mini ? (
          <>
            <Stack direction={"column"} spacing={0.5} mb={4}>
              <IconButton sx={{ borderRadius: 2 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <XIcon />
              </IconButton>
            </Stack>
            <Stack direction={"column"} ml={1} mb={2}>
              <Typography sx={{ fontSize: { sm: "0.95rem", lg: "0.75rem" } }}>
                © MMart
              </Typography>
              <Typography
                ml={1.5}
                sx={{ fontSize: { sm: "0.95rem", lg: "0.75rem" } }}
              >
                {new Date().getFullYear()}
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction={"column"} mx={8} mb={1}>
              <Typography>Made with love by devs</Typography>
              <Typography mx={6}>© {new Date().getFullYear()}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1} mx={6} mb={4}>
              <IconButton sx={{ borderRadius: 2 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 2 }}>
                <XIcon />
              </IconButton>
            </Stack>
          </>
        )}
      </Typography>
    );
  }

  SidebarFooter.propTypes = {
    mini: PropTypes.bool.isRequired,
  };
  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <ShoppingBasket size={32} color="#c95454" /> */}
        <Typography sx={{ fontSize: { xs: "0.95rem", lg: "1.5 rem" } }}>
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
