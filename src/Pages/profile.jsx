import { Box, Divider, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded || "User"); // Provide a fallback name
        console.log(decoded.name);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []); // Run only once when the component mounts

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mx: { xs: 8 } }}>
        My Profile , {user.name}
      </Typography>

      <Box>
        <Box>
          <Typography variant="h6" fontWeight={"bold"} my={2}>
            My posts
          </Typography>
        </Box>
        <Box>
          <Stack direction={"row"} spacing={4}>
            <Typography>UserName</Typography>:
            <Typography>{user.name}</Typography>
          </Stack>

          <Stack direction={"row"} spacing={4}>
            <Typography>Phone</Typography>:<Typography>{user.email}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={4}>
            <Typography>Phone</Typography>:<Typography>{user.role}</Typography>
          </Stack>
        </Box>
        <Box>
          <Box>
            <Typography>
              <Typography fontWeight={"bold"} my={6}>
                Favorites
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
