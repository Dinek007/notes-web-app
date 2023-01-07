import { colors as muiColors } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export const getPalette = (theme, mainColor) => {
  let textColor;
  let secondaryColor;

  if (theme === "dark") {
    textColor = "#ffffff";
    secondaryColor = "#2F303A";
  } else {
    textColor = "#000000";
    secondaryColor = "#ffffff";
  }

  return createPalette({
    background: {
      default: "#2F303A",
    },
    primary: {
      main: mainColor,
    },
    secondary: {
      main: secondaryColor,
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
      primary: textColor,
      secondary: "#545778",
    },
    grey: {
      "200": "#F0F0F4",
    },
  });
};
  

