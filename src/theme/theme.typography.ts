import { Palette } from "@mui/material/styles";
import createTypography from "@mui/material/styles/createTypography";

export const getTypography = (palette: Palette) =>
  createTypography(palette, {
    fontFamily: "Poppins",
    fontSize: 12,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 10,
      fontFamily: "Poppins",
    },
    h2: {
      fontSize: "2.2rem",
      fontFamily: "Poppins",
      fontWeight: 700
    },
    h3: {
      fontSize: "2rem",
      fontFamily: "Poppins",
    },
    h4: {
      fontSize: "1.8rem",
      fontFamily: "Poppins",
    },
    h5: {
      fontSize: "1.4rem",
      fontFamily: "Poppins",
    },
    h6: {
      fontSize: "1rem",
      fontFamily: "Poppins",
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontWeight: 600,
    },
    subtitle2: { fontSize: "1rem" },
    button: {
      fontSize: "16px",
    },
  });
