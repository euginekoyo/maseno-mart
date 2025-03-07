import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("🔍 Checking Auth");
  console.log("Token:", token);
  console.log("Role:", role);

  if (!token || role !== "admin") {
    console.warn("🚨 Unauthorized! Redirecting to login.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
