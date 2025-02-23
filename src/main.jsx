import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Category from "./Pages/Category.jsx";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import Page404 from "./Pages/404.jsx";
>>>>>>> 84299b7 (added Login,Signup & 404 pages)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "admin", element: <AdminDashboard /> },
          { path: "category", element: <Category /> },
          { path: "/404", element: <Page404 /> },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
