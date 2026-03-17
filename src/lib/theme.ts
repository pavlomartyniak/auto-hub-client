import { createTheme } from "@mui/material/styles";

// Centralized theme keeps UI consistent and easy to extend

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    secondary: { main: "#0ea5e9" },
    background: { default: "#f8fafc" },
    common: {
      white: "#ffffff",
      black: "#030303",
    },
    grey: {
      50: "#D3D3D3",
      100: "#A9A9A9",
      200: "#808080",
      300: "#666666",
      400: "#595959",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    body2: {
      color: "#808080",
    },
    body1: {
      color: "#666666",
    },
  },
  shape: {
    borderRadius: 12,
  },
});
