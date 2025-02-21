import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Outlet } from "react-router-dom";
import { ShoppingBasket,LayoutDashboard } from "lucide-react";

const Navigation = [
  {
    kind: "header",
    title: "",
  },
  {
    segment: "",
    title: "Dashboard",
    icon:<LayoutDashboard size={28} color="#c95454" />,
  },
];
function App() {
  return (
    <AppProvider
      branding={{
        title: "Maseno Mart",
        logo: <ShoppingBasket size={32} color="#c95454" />,
      }}
      navigation={Navigation}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
