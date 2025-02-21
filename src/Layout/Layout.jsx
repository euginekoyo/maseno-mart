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
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBasket } from "lucide-react";
function Layout() {
  function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: "inline", md: "none" },
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
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }

  function SidebarFooter({ mini }) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
      >
        {mini
          ? "© MasenoMart"
          : `© ${new Date().getFullYear()} Made with love by devs`}
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
        <Typography variant="h5">MasenoMart</Typography>
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
