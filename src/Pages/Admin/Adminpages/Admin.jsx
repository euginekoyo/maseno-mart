import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../AdminComponents/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> {/* This will render ListService or ListProduct */}
      </div>
    </div>
  );
};

export default Admin;
