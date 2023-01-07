import React from "react";
import { Box } from "@mui/material";
import { CategoryListComponent } from "./categoryList.component";
import { NotesPageHeaderComponent } from "./notesPageHeader.component";
import { NotesFieldComponent } from "./notesField.component";

export const NotesComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
      }}
    >
      <CategoryListComponent />

      <Box
        sx={{
          position: "fixed",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          right: "0px",
          width: "85vw",
        }}
      >
        <NotesPageHeaderComponent />
        <NotesFieldComponent />
      </Box>
    </Box>
  );
};
