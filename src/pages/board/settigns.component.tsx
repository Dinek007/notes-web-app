import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { HomePageComponent } from "./homePage.component";
import OpacityIcon from "@mui/icons-material/Opacity";
import { SettingComponent } from "../../components/setting.component";
import {
  boardSizes,
  fontSizes,
  noteColorsPalette,
  noteSizes,
  settingsActions,
  size,
  themeNames,
} from "../../redux/settings/settings.slice";
import { settingsSelectors } from "../../redux/settings/settings.selectors";

export enum sizesNames {
  verySmall = "Very small",
  small = "Small",
  medium = "Medium",
  big = "Big",
  veryBig = "Very big",
  fhd = "FHD display",
  k2 = "2k display",
  k4 = "4k display",
}

export const SettingsComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const themeSetting = useSelector(settingsSelectors.theme);
  const mainColorSetting = useSelector(settingsSelectors.mainColor);
  const noteColorSetting = useSelector(settingsSelectors.noteColor);
  const fontSizeSetting = useSelector(settingsSelectors.fontSize);
  const noteSizeSetting = useSelector(settingsSelectors.noteSize);
  const boardSizeSetting = useSelector(settingsSelectors.boardSize);

  const [themeColor, setThemeColor] = useState<string>(themeSetting);
  const [mainColor, setMainColor] = useState<string>(mainColorSetting);
  const [noteColor, setNoteColor] = useState<string>(noteColorSetting);

  const [fontSize, setFontSize] = useState<string>(fontSizeSetting);
  const [noteSize, setNoteSize] = useState<size>(noteSizeSetting);
  const [boardSize, setBoardSize] = useState<size>(boardSizeSetting);

  const handleTheme = (themeName) => {
    setThemeColor(themeName);
    dispatch(settingsActions.setTheme(themeName));
  };

  const handleMainColor = (color) => {
    setMainColor(color);
    dispatch(settingsActions.setMainColor(color));
  };

  const handleNoteColor = (color) => {
    setNoteColor(color);
    dispatch(settingsActions.setNoteColor(color));
  };

  const handleFontSize = (size) => {
    setFontSize(size);
    dispatch(settingsActions.setFontSize(size));
  };

  const handleNoteSize = (size) => {
    setNoteSize(size);
    dispatch(settingsActions.setNoteSize(size));
  };

  const handleBoardSize = (size) => {
    setBoardSize(size);
    dispatch(settingsActions.setBoardSize(size));
  };

  const colors = Object.values(noteColorsPalette);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        position: "relative",
        top: "5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "9px",
        boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
        padding: "50px",
        minWidth: "75vw",
        minHeight: "80vh",
        marginBottom: "10vh",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      {/* settings */}

      <Box
        sx={{
          marginTop: "50px",
          marginBottom: "70px",
        }}
      >
        <SettingComponent
          title="Theme"
          children={
            <Box>
              <Button
                onClick={() => handleTheme(themeNames.dark)}
                sx={{
                  border:
                    themeColor === themeNames.dark &&
                    `3px solid ${theme.palette.primary.main}`,
                  backgroundColor: "#151515",
                  color: "white",
                  marginRight: "20px",
                }}
              >
                <Typography> Dark </Typography>
              </Button>
              <Button
                onClick={() => handleTheme(themeNames.light)}
                sx={{
                  border:
                    themeColor === themeNames.light &&
                    `3px solid ${theme.palette.primary.main}`,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                }}
              >
                <Typography> Light</Typography>
              </Button>
            </Box>
          }
        />

        <SettingComponent
          title="Main account color"
          children={
            <Box>
              {colors.map((color) => {
                const isChecked = Boolean(color === mainColor);
                return (
                  <IconButton
                    key={color}
                    size="large"
                    sx={{
                      padding: isChecked ? `7px` : `10px`,
                      border:
                        isChecked && `3px solid ${theme.palette.primary.main}`,
                      color: color,
                    }}
                    onClick={() => handleMainColor(color)}
                  >
                    <OpacityIcon />
                  </IconButton>
                );
              })}
            </Box>
          }
        />

        <SettingComponent
          title="New note color"
          children={
            <Box>
              {colors.map((color) => {
                const isChecked = Boolean(color === noteColor);
                return (
                  <IconButton
                    key={color}
                    size="large"
                    sx={{
                      padding: isChecked ? `7px` : `10px`,
                      border:
                        isChecked && `3px solid ${theme.palette.primary.main}`,
                      color: color,
                    }}
                    onClick={() => handleNoteColor(color)}
                  >
                    <OpacityIcon />
                  </IconButton>
                );
              })}
            </Box>
          }
        />
        <SettingComponent
          title="New note size"
          children={
            <Box>
              {Object.keys(noteSizes).map((size) => {
                console.log(noteSizes[size], noteSize);
                const isChecked = Boolean(
                  noteSizes[size].width === noteSize.width
                );
                return (
                  <Button
                    key={size}
                    sx={{
                      backgroundColor: `${theme.palette.secondary.main}`,
                      color: `${theme.palette.text.primary}`,
                      marginRight: "20px",
                      padding: isChecked ? `7px` : `10px`,
                      border:
                        isChecked && `3px solid ${theme.palette.primary.main}`,
                    }}
                    onClick={() => handleNoteSize(noteSizes[size])}
                  >
                    {sizesNames[size]}
                  </Button>
                );
              })}
            </Box>
          }
        />
        <SettingComponent
          title="Note font size"
          children={
            <Box>
              {Object.keys(fontSizes).map((size) => {
                const isChecked = Boolean(fontSizes[size] === fontSize);
                return (
                  <Button
                    key={size}
                    sx={{
                      color: `${theme.palette.text.primary}`,
                      backgroundColor: `${theme.palette.secondary.main}`,
                      marginRight: "20px",
                      padding: isChecked ? `7px` : `10px`,
                      border:
                        isChecked && `3px solid ${theme.palette.primary.main}`,
                    }}
                    onClick={() => handleFontSize(fontSizes[size])}
                  >
                    {sizesNames[size]}
                  </Button>
                );
              })}
            </Box>
          }
        />
        {/* <SettingComponent
          title="Board size"
          children={
            <Box>
              {Object.keys(boardSizes).map((size) => {
                const isChecked = Boolean(boardSizes[size] === boardSize);
                return (
                  <Button
                    key={size}
                    sx={{
                      backgroundColor: `${theme.palette.secondary.main}`,
                      marginRight: "20px",
                      padding: isChecked ? `7px` : `10px`,
                      border:
                        isChecked && `3px solid ${theme.palette.primary.main}`,
                    }}
                    onClick={() => handleBoardSize(boardSizes[size])}
                  >
                    {sizesNames[size]}
                  </Button>
                );
              })}
            </Box>
          }
        /> */}
      </Box>
    </Box>
  );
};
