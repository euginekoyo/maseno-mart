import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyPress}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => onSearch(query)} aria-label="search">
            <SearchIcon />
          </IconButton>
        ),
      }}
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 2,
        mb: 2,
      }}
    />
  );
}

export default SearchBar;
