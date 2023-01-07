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

  const palette = getPalette(themeColor, mainColor);
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
