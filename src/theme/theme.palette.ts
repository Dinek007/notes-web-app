import { colors as muiColors } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export const getPalette = () =>
  createPalette({
    mode: "light",
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#E4CCC7",
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
      primary: "#2A3755",
      secondary: "#545778",
    },
    grey: {
      "200": "#F0F0F4",
    },
  });
