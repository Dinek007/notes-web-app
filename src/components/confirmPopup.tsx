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
import { LoadingButton } from "@mui/lab";

export interface ConfirmPopupComponentProps {
  popupTitle: string;
  popupContent: any;
  handleClose: () => void;
  handleConfirm: () => void;
  isLoading: boolean;
}

export const ConfirmPopupComponent: React.FC<ConfirmPopupComponentProps> = ({
  handleClose,
  popupTitle,
  popupContent,
  handleConfirm,
  isLoading,
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
            <LoadingButton
              style={{
                marginTop: "60px",
                left: "50%",
                transform: "translate(-50%, 0)",
                width: "203px",
                height: "55px",
                backgroundColor: getPalette().primary.main,
                boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
              }}
              type="submit"
              variant="text"
              onClick={() => {
                handleConfirm();
                handleClose();
              }}
              loading={isLoading}
            >
              <Typography variant="h4">Confirm</Typography>
            </LoadingButton>
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
