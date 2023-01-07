import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { AddCategoryValues } from "../pages/board/main.field";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ControlledInput } from "./TextInput/TextInput.controlled";
import { defaultAddCategoryValues } from "../pages/board/main.field";

import { getPalette } from "../theme/theme.palette";
import { notesActions } from "../redux/notes/notes.slice";
import { useDispatch } from "react-redux";
import { PopupComponent } from "./popup.component";
import { LoadingButton } from "@mui/lab";

export interface AddItemComponentProps {
  handleCloseAddCategoryPopup: () => void;
  isLoading: boolean;
  isNewCategory: boolean;
  folderId: string;
}

export const AddItemComponent: React.FC<AddItemComponentProps> = ({
  handleCloseAddCategoryPopup,
  isLoading,
  isNewCategory,
  folderId,
}) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState } = useForm<AddCategoryValues>({
    defaultValues: defaultAddCategoryValues,
    mode: "onChange",
  });

  const handleAddCategoryConfirm = (values: AddCategoryValues) => {
    if (isNewCategory) {
      dispatch(
        notesActions.newCategory({
          name: values.title,
          description: values.description,
        })
      );
    } else {
      dispatch(
        notesActions.updateCategory({
          folderId,
          folderElements: {
            name: values.title,
            description: values.description,
          },
        })
      );
    }

    handleCloseAddCategoryPopup();
  };

  return (
    <PopupComponent
      title={isNewCategory ? "Create new category" : "Update category"}
      handleClosePopup={handleCloseAddCategoryPopup}
      children={
        <form onSubmit={handleSubmit(handleAddCategoryConfirm)}>
          <Box sx={{ marginTop: "10px" }}>
            <ControlledInput
              style={{
                width: "384px",
                height: "54px",
              }}
              name={"title"}
              title="Category name"
              control={control}
              type="text"
            />
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <ControlledInput
              style={{
                width: "384px",
                height: "54px",
              }}
              name={"description"}
              title="Description"
              control={control}
              type="text"
            />
          </Box>
          <LoadingButton
            loading={isLoading}
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
          >
            <Typography variant="h4">Confirm</Typography>
          </LoadingButton>
        </form>
      }
    ></PopupComponent>
  );
};
