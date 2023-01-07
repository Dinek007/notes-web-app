import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { getPalette } from "../theme/theme.palette";
import { PopupComponent } from "./popup.component";
import OpacityIcon from "@mui/icons-material/Opacity";
import { NoteModel } from "../swagger/api";
import { noteColorsPalette } from "../redux/settings/settings.slice";
import { useSelector } from "react-redux";
import { settingsSelectors } from "../redux/settings/settings.selectors";

export interface ChangeNoteColorComponentProps {
  handleCloseColorPopup: () => void;
  handleChangeColor: (color: string) => void;
  note: NoteModel;
}

export const ChangeNoteColorComponent: React.FC<
  ChangeNoteColorComponentProps
> = ({ handleCloseColorPopup, handleChangeColor, note }) => {
  const theme = useTheme();

  const [currentColor, setCurrentColor] = useState<string>(note.color);
  const borderColor = useSelector(settingsSelectors.mainColor);

  const colors = Object.values(noteColorsPalette);

  const handleSetColor = (color: string) => {
    setCurrentColor(color);
  };

  return (
    <PopupComponent
      title="Change note color"
      handleClosePopup={handleCloseColorPopup}
      children={
        <Box>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {colors.map((color) => {
              const isChecked = Boolean(color === currentColor);
              return (
                <IconButton
                  key={color}
                  size="large"
                  sx={{
                    padding: isChecked ? `9px` : `12px`,
                    border: isChecked && `3px solid ${borderColor}`,
                    color: color,
                  }}
                  onClick={() => handleSetColor(color)}
                >
                  <OpacityIcon />
                </IconButton>
              );
            })}
          </Box>

          <Button
            style={{
              marginTop: "60px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "203px",
              height: "55px",
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
            }}
            type="submit"
            onClick={() => {
              handleChangeColor(currentColor);
              handleCloseColorPopup();
            }}
          >
            <Typography variant="h4">Confirm</Typography>
          </Button>
        </Box>
      }
    ></PopupComponent>
  );
};
