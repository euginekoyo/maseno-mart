import React, { useState } from "react";
import {
  Stack,
  Box,
  Checkbox,
  Divider,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Facebook,
  InstagramIcon,
  LinkedinIcon,
  LogIn,
  ShoppingBasket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";
import { loginUser } from "../api/api"; // Ensure this function correctly sends login requests

function Login() {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(Data);

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
        title: error.response?.data?.message || "Login failed. Check your credentials.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      {/* Header with Logo */}
      <IconButton
        sx={{
          mt: -10,
          mx: { xs: 5 },
          boxShadow: 10,
          borderRadius: 4,
          width: { xs: 300 },
          bgcolor: "black",
        }}
      >
        <ShoppingBasket color="lightBlue" size={40} />
        <Typography mx={4}>Maseno-Mart</Typography>
      </IconButton>

      {/* Social Login Buttons */}
      <Box
        sx={{
          mb: 4,
          mt: 4,
          mx: { xs: 1, lg: 60 },
          bgcolor: "ButtonHighlight",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Continue with Facebook">
          <IconButton sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}>
            <Facebook />
          </IconButton>
        </Tooltip>
        <Tooltip title="Continue with Google">
          <IconButton sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}>
            <GoogleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Continue with Instagram">
          <IconButton sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}>
            <InstagramIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Continue with LinkedIn">
          <IconButton sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}>
            <LinkedinIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Divider */}
      <Stack my={6} sx={{ mx: { xs: 8, lg: 57 } }} direction={"row"} spacing={2}>
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
        <Typography mt={8}>Or</Typography>
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
      </Stack>

      {/* Login Form */}
      <Box
      container
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        mx: { lg: 55, xs: 2 },
        my: 6,
        boxShadow: 3,
        borderRadius: 4,
        width: { lg: 400, xs: 360 },
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      >
        <Typography variant="h5" fontFamily={"monospace"} my={2}>
          Login
        </Typography>

        {/* Email Input */}
        <Box my={1}>
          <TextField
            label="Email"
            type="text"
            name="email"
            fullWidth

            value={Data.email}
            onChange={handleChange}
            size="small"
            sx={{ fontFamily: "monospace", width:300}}
            required
          />
        </Box>

        {/* Password Input */}
        <Box my={1}>
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            
            value={Data.password}
            onChange={handleChange}
            size="small"
            sx={{ fontFamily: "monospace" ,width:300 }}
            required
          />
        </Box>

        {/* Remember Me Checkbox */}
        <Box sx={{ display: "flex", alignItems: "center", ml: -14 }}>
          <Checkbox size="small" />
          <Typography sx={{ fontSize: "0.85rem" }}>Remember me</Typography>
        </Box>

        {/* Login Button */}
        <Box my={2}>
          <IconButton
            sx={{ bgcolor: " tomato", borderRadius: 2, mx: 8, width: 230 }}
            type="submit"
          >
            <Typography mx={1} sx={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
              Login
            </Typography>
            <LogIn />
          </IconButton>
        </Box>

        {/* Signup Link */}
        <Box sx={{ display: "flex", flexDirection: "row" ,mb:3}}>
          <Typography mx={1} my={0.5} fontSize="0.75rem" fontFamily="monospace">
            Don't have an account?
          </Typography>
          <Link
            to="/signup"
            style={{
              textDecoration: "underline",
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            Signup
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Login;
