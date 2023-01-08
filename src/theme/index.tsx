import { ReactNode } from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getPalette } from "./theme.palette";
import { getTypography } from "./theme.typography";
import { getComponents } from "./theme.components";
import { useSelector } from "react-redux";
import { settingsSelectors } from "../redux/settings/settings.selectors";
import { themeNames } from "../redux/settings/settings.slice";
import { colorShade } from "../common";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    borderGrey: Palette["primary"];
  }
  interface PaletteOptions {
    borderGrey: PaletteOptions["primary"];
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeColor = useSelector(settingsSelectors.theme);
  const mainColor = useSelector(settingsSelectors.mainColor);

  let textColor;
  let primaryColor;
  let secondaryColor;

  if (themeColor === themeNames.dark) {
    textColor = "#ffffff";
    primaryColor = mainColor;
    secondaryColor = "#2F303A";
  } else {
    textColor = "#000000";
    primaryColor = colorShade(mainColor, 60);
    secondaryColor = "#ffffff";
  }

  const palette = getPalette(textColor, primaryColor, secondaryColor);
  const typography = getTypography(palette);
  const components = getComponents(palette) as any;

  const theme = responsiveFontSizes(
    createTheme({
      palette,
      components,
      typography,
    })
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
