import React from "react";
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
import { NoteModel } from "../swagger/api";

export interface OneInputComponentProps {
  handleClosePopup: () => void;
  handleConfirm: (value) => void;
  popupTtitle: string;
  inputTitle: string;
}

export const OneInputComponent: React.FC<OneInputComponentProps> = ({
  handleClosePopup,
  popupTtitle,
  inputTitle,
  handleConfirm,
}) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState } = useForm({
    defaultValues: { value: "" },
    mode: "onChange",
  });

  return (
    <PopupComponent
      title={popupTtitle}
      handleClosePopup={handleClosePopup}
      children={
        <form onSubmit={handleSubmit(handleConfirm)}>
          <Box sx={{ marginTop: "10px" }}>
            <ControlledInput
              style={{
                width: "384px",
                height: "54px",
              }}
              name={"value"}
              title={inputTitle}
              control={control}
              type="text"
            />
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
          >
            <Typography variant="h4">Confirm</Typography>
          </Button>
        </form>
      }
    ></PopupComponent>
  );
};
