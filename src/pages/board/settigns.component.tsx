import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { HomePageComponent } from "./homePage.component";
import OpacityIcon from "@mui/icons-material/Opacity";
import { SettingComponent } from "../../components/setting.component";
import {
  noteColorsPalette,
  settingsActions,
  size,
  themeNames,
} from "../../redux/settings/settings.slice";
import { settingsSelectors } from "../../redux/settings/settings.selectors";

export const SettingsComponent = () => {
  const dispatch = useDispatch();

  const themeSetting = useSelector(settingsSelectors.theme);
  const mainColorSetting = useSelector(settingsSelectors.mainColor);
  const noteColorSetting = useSelector(settingsSelectors.noteColor);
  const fontSizeSetting = useSelector(settingsSelectors.fontSize);
  const noteSizeSetting = useSelector(settingsSelectors.noteSize);
  const boardSizeSetting = useSelector(settingsSelectors.boardSize);

  const [theme, setTheme] = useState<string>(themeSetting);
  const [mainColor, setMainColor] = useState<string>(mainColorSetting);
  const [noteColor, setNoteColor] = useState<string>(noteColorSetting);

  const [fontSize, setFontSize] = useState<string>(fontSizeSetting);
  const [noteSize, setNoteSize] = useState<size>(noteSizeSetting);
  const [boardSize, setBoardSize] = useState<size>(boardSizeSetting);

  const handleTheme = (themeName) => {
    setTheme(themeName);
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

  const colors = Object.values(noteColorsPalette);
  return (
    <Box
      sx={{
        backgroundColor: getPalette().secondary.dark,
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
                    theme === themeNames.dark &&
                    `3px solid ${getPalette().primary.main}`,
                  backgroundColor: getPalette().secondary.light,
                  marginRight: "20px",
                }}
              >
                Dark
              </Button>
              <Button
                onClick={() => handleTheme(themeNames.light)}
                sx={{
                  border:
                    theme === themeNames.light &&
                    `3px solid ${getPalette().primary.main}`,
                  backgroundColor: "#f5f5f5",
                  color: "black",
                }}
              >
                Light
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
                        isChecked && `3px solid ${getPalette().primary.main}`,
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
          title="Default note color"
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
                        isChecked && `3px solid ${getPalette().primary.main}`,
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
        <SettingComponent title="Default note size" children={<></>} />
        <SettingComponent title="Default note font size" children={<></>} />
        <SettingComponent title="Default board size" children={<></>} />
      </Box>
    </Box>
  );
};
