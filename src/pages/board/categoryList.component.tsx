import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import {
  currentActionNames,
  sessionActions,
} from "../../redux/session/session.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { getPalette } from "../../theme/theme.palette";
import { AddItemComponent } from "../../components/addItemFrom.component";

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

  const [showAddCategoryForm, setShowAddCategoryForm] =
    useState<boolean>(false);
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);

  const handleCategoryClick = (name) => {
    dispatch(sessionActions.setCurrentCategory(name));
  };

  useEffect(() => {
    if (!showAddCategoryForm && !addCategoryActionStatus) {
      setOpenAddCategory(false);
    }
    if (showAddCategoryForm) {
      setOpenAddCategory(true);
    }
  }, [addCategoryActionStatus, showAddCategoryForm]);

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
          isLoading={addCategoryActionStatus}
          handleCloseAddCategoryPopup={() => setShowAddCategoryForm(false)}
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
        onClick={() => setShowAddCategoryForm(true)}
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
              backgroundColor: isSelected
                ? getPalette().secondary.dark
                : getPalette().primary.dark,
            }}
            title={category.description}
            onClick={() => {
              handleCategoryClick({ id: category.id, name: category.name });
            }}
          >
            <Typography variant="h6">{category.name}</Typography>
          </Button>
        );
      })}
    </Box>
  );
};
