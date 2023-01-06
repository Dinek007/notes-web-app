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

export interface ConfirmPopupComponentProps {
  popupTitle: string;
  popupContent: any;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmPopupComponent: React.FC<ConfirmPopupComponentProps> = ({
  handleClose,
  popupTitle,
  popupContent,
  handleConfirm,
}) => {
  return (
    <PopupComponent
      title={popupTitle}
      handleClosePopup={handleClose}
      children={
        <>
          <Box
            sx={{
              width: "300px",
              textAlign: "center",
            }}
          >
            {popupContent}
          </Box>
          <Box>
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
                handleConfirm();
                handleClose();
              }}
            >
              <Typography variant="h4">Confirm</Typography>
            </Button>
          </Box>

          <Box>
            <Button variant="text" onClick={handleClose}>
              <Typography variant="h6" color="GrayText">
                Nevermind
              </Typography>
            </Button>
          </Box>
        </>
      }
    ></PopupComponent>
  );
};
