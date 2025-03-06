import React from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchButton() {
  return (
      <TextField
        // label="Search"
        variant="outlined"
        placeholder="serch"
        size="small"
        colo
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton
              type="button"
              aria-label="search"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{
          display: { xs: "block", md: "inline-block" },
          width: { xs: "100%", sm: "auto" },
          mr: { lg: 10, xs: 0.1 },
          mt: { lg: 2 },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "background.paper" }, // Border color
            "&:hover fieldset": { borderColor: "background.paper" }, // Hover color
            "&.Mui-focused fieldset": { borderColor: "background.paper" }, // Focus color
          },
          input: { color: "#ffffff" }, // Text color
          backgroundColor: "#333", // Background color
          borderRadius: 10,
        }}
      />
  );
}

export default SearchButton;
