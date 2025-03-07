import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout/Layout.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import AdminApp from "./Pages/Admin/AdminApp.jsx";
import Page404 from "./Pages/404.jsx";
import Products from "./Pages/products.jsx";
import Services from "./Pages/services.jsx";
import ListProduct from "./Pages/Admin/AdminComponents/ListProduct/ListProduct";
import ListService from "./Pages/Admin/AdminComponents/listService/ListService";
import AdminRoute from "./components/AdminRoute"; // ✅ Import protected route

import "bootstrap/dist/css/bootstrap.min.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "products", element: <Products /> },
          { path: "services", element: <Services /> },
          { path: "404", element: <Page404 /> },
        ],
      },
      {
        path: "admin",
        element: <AdminRoute />, // Protect admin routes
        children: [
          {
            path: "",
            element: <AdminApp />,
            children: [
              { path: "listservice", element: <ListService /> },
              { path: "listproduct", element: <ListProduct /> },
            ],
          },
        ],
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
