import React from "react";
import {
  Stack,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Facebook,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  LogIn,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
function SignUp() {
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
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box my={1}>
          <TextField
            label="password"
            name="password"
            fullWidth
            color="warning"
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box my={1}>
          <TextField
            label="Physical location"
            name="location"
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace", width: 230 }}
          ></TextField>
        </Box>
        <Box my={1}>
          <TextField
            label="phone number"
            name="phone"
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box my={1}>
          <TextField
            name="profileImage"
            type="file"
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace", fontSize: "0.75rem", width: 237 }}
          />
        </Box>

        <Box my={2}>
          <IconButton
            sx={{ bgcolor: "black", borderRadius: 2, mx: 8, width: 230 }}
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
            Signin
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
