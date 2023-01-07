import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, useTheme } from "@mui/material";
import { ControlledInput } from "./TextInput/TextInput.controlled";
import { getPalette } from "../theme/theme.palette";
import { PopupComponent } from "./popup.component";
import { LoadingButton } from "@mui/lab";

export interface OneInputComponentProps {
  handleClosePopup: () => void;
  handleConfirm: (value) => void;
  popupTtitle: string;
  inputTitle: string;
  isLoading: boolean;
}

export const OneInputComponent: React.FC<OneInputComponentProps> = ({
  handleClosePopup,
  popupTtitle,
  inputTitle,
  handleConfirm,
  isLoading,
}) => {
  const theme = useTheme();

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
          <LoadingButton
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
            loading={isLoading}
          >
            <Typography variant="h4">Confirm</Typography>
          </LoadingButton>
        </form>
      }
    ></PopupComponent>
  );
};
