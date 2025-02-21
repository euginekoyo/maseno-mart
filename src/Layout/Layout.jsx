import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
function Layout() {
  return (
    <DashboardLayout defaultSidebarCollapsed>
      <Outlet />
    </DashboardLayout>
  );
}

export default Layout;
