import React from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { notesActions } from "../../redux/notes/notes.slice";
import { sessionActions } from "../../redux/session/session.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";

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
        background: "#14548F",
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
        }}
      >
        Category list:
      </Typography>

      {Object.values(categories).map((category) => {
        const isSelected = category.id === currentCategory.id;
        return (
          <Button
            key={category.id}
            style={{
              width: "13vw",
              height: "37px",
              borderRadius: "5px",
            }}
            color={isSelected ? "secondary" : "primary"}
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
