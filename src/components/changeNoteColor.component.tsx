import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { AddCategoryValues } from "../pages/board/main.field";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ControlledInput } from "./TextInput/TextInput.controlled";
import { defaultAddCategoryValues } from "../pages/board/main.field";

import { getPalette } from "../theme/theme.palette";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { notesActions } from "../redux/notes/notes.slice";
import { useDispatch } from "react-redux";
import { PopupComponent } from "./popup.component";
import OpacityIcon from "@mui/icons-material/Opacity";
import { NoteModel } from "../swagger/api";

export interface ChangeNoteColorComponentProps {
  handleCloseColorPopup: () => void;
  handleChangeColor: (color: string) => void;
  note: NoteModel;
}

export enum noteColorsPalette {
  red = "#E74C3C",
  orange = "#F39C12",
  pink = "#ff96c5",
  yellow = "#ffdf6d",
  green = "#cff800",
  lightGreen = "#82E0AA",
  violet = "#A569BD",
  lightViolet = "#D2B4DE",
  blue = "#00a5e3",
  lightBlue = "#AED6F1",
  gray = "#85929E",
  lightGray = "#CCD1D1",
}

export const ChangeNoteColorComponent: React.FC<
  ChangeNoteColorComponentProps
> = ({ handleCloseColorPopup, handleChangeColor, note }) => {
  const [currentColor, setCurrentColor] = useState<string>(note.color);

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
                    border:
                      isChecked && `3px solid ${getPalette().primary.main}`,
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
              backgroundColor: getPalette().primary.main,
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
