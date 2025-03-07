import React from "react";
import Navbar from "./AdminComponents/Navbar/Navbar";
import Admin from "./Adminpages/Admin";
import Footer from "./AdminComponents/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminComponents/Sidebar/Sidebar";

function AdminApp() {
  return (
    <div>
      <Navbar />
      <div className="admin">
        <Sidebar />
        <div className="admin-content">
          <Outlet /> {/* This will render ListService or ListProduct */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminApp;
