import { Divider, Stack, Typography, Box, IconButton } from "@mui/material";
import { Bold, SmileIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  return (
    <Box sx={{ mx: { lg: 50, xs: 4 }, mt: 14 }}>
      <Stack direction={"column"}>
        <Typography
          fontFamily={"monospace"}
          sx={{ fontSize: { lg: "5rem", xs: "3rem" }, mx: { xs: 14, lg: 20 } }}
        >
          404
        </Typography>
        <Typography
          fontFamily={"monospace"}
          sx={{ fontSize: { xs: "1rem" }, mx: { xs: 10, lg: 20 } }}
        >
          PAGE NOT FOUND
        </Typography>
        <Divider
          sx={{
            my: 2,
            width: 100,
            fontWeight: "bolder",
            mx: { lg: 22, xs: 13 },
          }}
        />
        <Typography
          sx={{
            width: { xs: 300, lg: 400 },
            mx: { xs: 2, lg: 10 },
            fontFamily: "monospace",
          }}
        >
          But if you don't change your direction, and if you keep looking, you
          may end up where you are heading.
        </Typography>
        <IconButton
          sx={{
            mt: { xs: 10, lg: 6 },
            borderRadius: 4,
            width: { xs: 140 },
            mx: { xs: 12, lg: 18 },
            display: "flex",
            flexDirection: "column",
          }}
          onClick={()=>navigate("/")}
        >
          <SmileIcon color="red" size={80} />
          <Typography color="red" fontFamily={"monospace"}>
            Take me home
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Page404;
