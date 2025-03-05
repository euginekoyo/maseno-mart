import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c95454", // Your custom red color
    },
    secondary: {
      main: "#ffcc80",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
        primary: "#213547",
    },
  
    typography: {
        fontFamily: "Arial, sans-serif",
    },
  },
});

export default theme;
