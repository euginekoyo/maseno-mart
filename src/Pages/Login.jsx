import React from "react";
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
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  LogIn,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <IconButton
        sx={{
          mt: -27,
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
      <Box
        sx={{
          mb: 4,
          mt: 4,
          mx: { xs: 1, lg: 60 },
          bgcolor: "ButtonHighlight",
          borderRadius: 4,
          boxShadow: 10,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
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
            title="Continue with GitHub"
          >
            <IconButton
              my={1}
              sx={{ borderRadius: 4, width: { xs: 80, lg: 100 } }}
              disabled
            >
              <GithubIcon />
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
              <LinkedinIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Stack
        my={6}
        sx={{ mx: { xs: 8, lg: 57 } }}
        direction={"row"}
        spacing={2}
      >
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
        <Typography mt={8}>Or</Typography>
        <Divider sx={{ width: { xs: 100, lg: 200 } }} />
      </Stack>
      <Box
        container
        sx={{
          mx: { lg: 60, xs: 5 },
          boxShadow: 10,
          borderRadius: 6,
          width: { lg: 400, xs: 300 },
          height: 300,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontFamily={"monospace"} mt={-4}>
          Login
        </Typography>
        <Box my={1}>
          <TextField
            label="email"
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box my={1}>
          <TextField
            label="password"
            fullWidth
            size="small"
            sx={{ fontFamily: "monospace" }}
          />
        </Box>
        <Box
          sx={{
            ml: -14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox size="small"/>
          <Typography sx={{ fontSize: { xs: "0.85rem" } }}>
            Remember me
          </Typography>
        </Box>
        <Box my={2}>
          <IconButton
            sx={{ bgcolor: "black", borderRadius: 2, mx: 8, width: 230 }}
          >
            <Typography
              mx={1}
              sx={{ fontFamily: "monospace", fontSize: "0.85rem" }}
            >
              Login
            </Typography>
            <LogIn />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            mx={1}
            my={0.5}
            fontSize={{ xs: "0.75rem" }}
            fontFamily={"monospace"}
          >
            Don't have an account?
          </Typography>
          <Link
            to={"/signup"}
            style={{
              textDecoration: "underline",
              color: "wheat",
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
