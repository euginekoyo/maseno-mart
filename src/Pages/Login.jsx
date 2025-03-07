import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { loginUser } from "../api/api"; // Ensure this function correctly sends login requests
import Swal from "sweetalert2";
import { Box, CardMedia } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        navigate("/", {
          state: {
            message: `Welcome To Maseno-Mart`,
            type: "success",
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title:
          error.response?.data?.message ||
          "Login failed. Check your credentials.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="d-flex justify-content-center mb-4">
          <Box mx={"auto"}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                borderRadius: "8px 8px 0 0",
                height: { lg: "200px", xs: "80px" },
                objectFit: "cover",
              }}
              image={"/src/assets/logo.png"}
              alt={"maseno mart"}
            />
          </Box>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Enter your password"
                style={{ paddingRight: "40px" }} // Add padding to prevent text overlap
              />
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={togglePasswordVisibility}
                aria-label="Toggle Password Visibility"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              aria-label="Remember me"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>

        {/* Google login */}
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
            <GoogleIcon style={{ marginRight: "10px" }} />
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-underline">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
