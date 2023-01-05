import { colors as muiColors } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export const getPalette = () =>
  createPalette({
    mode: "light",
    background: {
      default: "#2F303A",
    },
    primary: {
      main: "#14548F",
    },
    secondary: {
      main: "#2F303A",
    },
    success: {
      main: "#66C965",
    },
    error: {
      main: "#DB5930",
    },
    borderGrey: {
      main: muiColors.grey[300],
    },
    warning: {
      main: "#FFC34A",
    },
    text: {
      primary: "#ffffff",
      secondary: "#545778",
    },
    grey: {
      "200": "#F0F0F4",
    },
  });

