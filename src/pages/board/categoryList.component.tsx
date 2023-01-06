import React from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { notesActions } from "../../redux/notes/notes.slice";
import { sessionActions } from "../../redux/session/session.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { getPalette } from "../../theme/theme.palette";

export interface CategoryListComponentProps {
  handleShowAddCategoryPopup: () => void;
}

export const CategoryListComponent: React.FC<CategoryListComponentProps> = ({
  handleShowAddCategoryPopup,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(notesSelectors.noteCategories);
  const currentCategory = useSelector(sessionSelectors.currentCategory);

  const handleCategoryClick = (name) => {
    dispatch(sessionActions.setCurrentCategory(name));
  };

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
      <Button
        style={{
          width: "90px",
          height: "90px",
          border: "2.7px solid #D9D9D9",
          borderRadius: "9px",
          marginBottom: "68px",
          backgroundColor: getPalette().primary.dark,
        }}
        onClick={handleShowAddCategoryPopup}
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
