  import React, { useState, useEffect } from "react";
  import { TextField, IconButton, Box, List, ListItem, Typography,useTheme } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import { fetchProducts, fetchServices } from "../api/api"; // Ensure fetchServices is imported
  import { Riple } from "react-loading-indicators";
  function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const fetchData = async () => {
      if (!search) return;
      setIsLoading(true);
      setError(null);

      try {
        const [productResponse, serviceResponse] = await Promise.all([
          fetchProducts({ search }),
          fetchServices({ search }),
        ]);

        const productResults = productResponse?.data?.data || [];
        const serviceResults = serviceResponse?.data?.data || [];
        const combinedResults = [...productResults, ...serviceResults];

        setItems(combinedResults);
        if (onSearch) onSearch(combinedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (search) {
        const delayDebounceFn = setTimeout(() => {
          fetchData();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      } else {
        setItems([]);
      }
    }, [search]);

    const handleSearch = () => {
      if (search) {
        fetchData();
      }
    };

    return (
      <Box sx={{  }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff"  ,
             color: theme.palette.mode === "dark" ? "#fff" : "#000",

            borderRadius: 4,
            mb: 2,
          }}
        />
        {isLoading && <Typography><Riple color="#3168cc" size="small" text="" textColor="" /></Typography>}
        {error && <Typography mx={20}color="error">{error}</Typography>}
        {items.length > 0 && (
          <Box
            sx={{
              mt: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <List>
              {items.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: "1px solid #eee" }}>
                  <Typography>{item.name}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    );
  }

  export default SearchBar;
