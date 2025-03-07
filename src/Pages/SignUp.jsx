import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";
import Swal from "sweetalert2";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { CardMedia, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
      const response = await signupUser(formData);
      console.log(response.data)
      if (response.status == 200) {
        navigate("/", {
          state: {
            message: `Welcome To Maseno-Mart`,
            type: "success",
          },
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);

      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: error.response?.data?.message || "Something went wrong.",
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
        <div className="d-flex justify-content-center ">
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Enter your username"
            />
          </div>

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
              aria-label="Enter your email"
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
          <div className="mb-3">
            <label htmlFor="userRole" className="form-label">
              Role
            </label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
              aria-label="Select your role"
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-underline">
              Login
            </Link>
          </p>
        </div>

        {/* Google login */}
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
            <GoogleIcon style={{ marginRight: "10px" }} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
