import React from "react";
import {
  Stack,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  Tooltip,MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import {
  Facebook,
  Smile,
  InstagramIcon,
  LogIn,
  ShoppingBasket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import { signupUser } from "../api/api";
import Swal from "sweetalert2";
function SignUp() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser(formData);

      if (response.status === 200) {
        navigate("/", {
          state: {
            message: `Welcome To Maseno-Mart${(<Smile color="#a9e10e" strokeWidth={3} />)}, ${formData.name}!`,
            type: "success",
          },
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        toast: true, // Enable toast mode
        position: "top", // Ensure it's at the top-right
        icon: "error",
        title: error.response?.data?.message || "Something went wrong.",
        showConfirmButton: false,
        timer: 3000, // Auto-dismiss after 3 seconds
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal-popup", // Custom class for styling
        },
      });
    }
  };

  return (
    <>
      <IconButton
        sx={{
          my: 2,
          bgcolor: "black",
          mx: { xs: 5 },
          boxShadow: 10,
          borderRadius: 4,
          width: { xs: 300 },
          height: { lg: "100%" },
        }}
      >
        <ShoppingBasket color="lightBlue" size={40} />

        <Typography mx={4}>Maseno-Mart</Typography>
      </IconButton>
      <Box
        container
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          mx: { lg: 55, xs: 2 },
          my: 6,
          boxShadow: 10,
          borderRadius: 6,
          width: { lg: 400, xs: 350 },
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontFamily={"monospace"} my={2}>
          Signup
        </Typography>
        <Typography fontSize={"0.85rem"} fontFamily={"monospace"}>
          Please enter your details...
        </Typography>
        <Box my={1}>
          <TextField
            label="username"
            name="name"
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>

        <Box my={1}>
          <TextField
            label="email"
            name="email"
            fullWidth
            onChange={handleChange}
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box my={1}>
          <TextField
            label="password"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
            color="warning"
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <FormControl sx={{width:205,mt:.5}}>
          <InputLabel sx={{fontSize:".85rem"}}>User Role</InputLabel>
          <Select
            name="role"
            size="small"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
        </FormControl>

        <Box my={2}>
          <IconButton
            sx={{ bgcolor: "black", borderRadius: 2, mx: 8, width: 230 }}
            type="submit"
          >
            <Typography
              mx={1}
              sx={{ fontFamily: "monospace", fontSize: "0.85rem" }}
            >
              Register
            </Typography>
            <LogIn />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", py: 1 }}>
          <Typography
            mx={1}
            my={0.5}
            fontSize={{ xs: "0.75rem" }}
            fontFamily={"monospace"}
          >
            Already have an account?
          </Typography>
          <Link
            to={"/login"}
            style={{
              textDecoration: "underline",
              color: "wheat",
              fontFamily: "monospace",

              fontSize: "0.85rem",
            }}
          >
            login
          </Link>
        </Box>
      </Box>
      <Stack
        my={6}
        sx={{ mx: { xs: 8, lg: 50 } }}
        direction={"row"}
        spacing={2}
      >
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
        <Typography mt={8}>Or</Typography>
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
      </Stack>
      <Box
        sx={{
          mb: 4,
          mx: { xs: 2, lg: 50 },
          bgcolor: "ButtonHighlight",
          borderRadius: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box>
          <Tooltip
            placement="top"
            popover="auto"
            followCursor="true"
            title="Continue with Facebook"
          >
            <IconButton
              my={1}
              sx={{
                borderRadius: 4,
                width: { xs: 80, lg: 100 },
              }}
            >
              <Facebook />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            placement="top"
            popover="auto"
            followCursor="true"
            title="Continue with Github"
          >
            <IconButton
              my={1}
              sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}
              disabled
            >
              <GoogleIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip
            placement="top"
            popover="auto"
            followCursor="true"
            title="Continue with Instagram"
          >
            <IconButton
              my={1}
              sx={{
                borderRadius: 4,
                width: { xs: 80, lg: 100 },
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip
            placement="top"
            popover="auto"
            followCursor="true"
            title="Continue with Linkedin"
          >
            <IconButton
              my={1}
              sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}
              disabled
            >
              <XIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
