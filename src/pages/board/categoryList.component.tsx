import React, { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import {
  currentActionNames,
  sessionActions,
} from "../../redux/session/session.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { getPalette } from "../../theme/theme.palette";
import { AddItemComponent } from "../../components/categoryForm.component";
import EditIcon from "@mui/icons-material/Edit";

export interface CategoryListComponentProps {}

export const CategoryListComponent: React.FC<
  CategoryListComponentProps
> = ({}) => {
  const dispatch = useDispatch();
  const categories = useSelector(notesSelectors.noteCategories);
  const currentCategory = useSelector(sessionSelectors.currentCategory);
  const addCategoryActionStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.addingFolder)
  );
  const updateCategoryActionStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.updateFolder)
  );

  const [showAddCategoryForm, setShowAddCategoryForm] =
    useState<boolean>(false);
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);

  const handleCategoryClick = (name) => {
    dispatch(sessionActions.setCurrentCategory(name));
  };

  useEffect(() => {
    if (
      !showAddCategoryForm &&
      !addCategoryActionStatus &&
      !updateCategoryActionStatus
    ) {
      console.log("here");
      setOpenAddCategory(false);
    }
    if (showAddCategoryForm) {
      setOpenAddCategory(true);
    }
  }, [
    addCategoryActionStatus,
    updateCategoryActionStatus,
    showAddCategoryForm,
  ]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "15vw",
        left: "0px",
        top: "0px",
        backgroundColor: getPalette().primary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "70px",
      }}
    >
      {openAddCategory && (
        <AddItemComponent
          folderId={currentCategory.id}
          isLoading={addCategoryActionStatus || updateCategoryActionStatus}
          handleCloseAddCategoryPopup={() => setShowAddCategoryForm(false)}
          isNewCategory={isNewCategory}
        />
      )}
      <Button
        style={{
          width: "90px",
          height: "90px",
          border: "2.7px solid #D9D9D9",
          borderRadius: "9px",
          marginBottom: "68px",
          backgroundColor: getPalette().primary.dark,
        }}
        onClick={() => {
          setIsNewCategory(true);
          setShowAddCategoryForm(true);
        }}
      >
        <Typography variant="h1"> + </Typography>
      </Button>

      <Typography
        variant="h5"
        style={{
          width: "15vw",
          borderBottom: "1px solid #D9D9D9",
          textAlign: "center",
          marginBottom: "5px",
          paddingBottom: "15px",
        }}
      >
        Category list
      </Typography>

      {Object.values(categories).map((category) => {
        const isSelected = category.id === currentCategory.id;
        return (
          <Button
            key={category.id}
            style={{
              width: "12vw",
              height: "42px",
              borderRadius: "5px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "left",
              backgroundColor: isSelected
                ? getPalette().secondary.dark
                : getPalette().primary.dark,
            }}
            title={category.description}
            onClick={() => {
              handleCategoryClick({ id: category.id, name: category.name });
            }}
          >
            <Typography textAlign={"left"} variant="h6">
              {category.name}
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: getPalette().secondary.light,
                position: "absolute",
                right: "0px",
              }}
              onClick={() => {
                setIsNewCategory(false);
                setShowAddCategoryForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Button>
        );
      })}
    </Box>
  );
};
