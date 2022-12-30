import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { NoteModel } from "../../swagger/api";
import TextareaAutosize from '@mui/base/TextareaAutosize';

export interface EditNoteComponentProps {
  note: NoteModel;
}

export const EditNoteComponent: React.FC<EditNoteComponentProps> = ({
  note,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: `${note.color}`,
        display: "flex",
        width: "85vw",
        height: "92vh",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        left: "15vw",
        top: "8vh",
        zIndex: 99999999999999999999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "0%",
          left: "0%",
          top: "0%",
          bottom: "0%",
          height: " 5vh",
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(217, 217, 217, 0.375) 50%, #D9D9D9 100%)",
          backgroundBlendMode: "multiply",
        }}
      >
        <Typography>
            {note.name} 
        </Typography>
      </Box>
      
        <TextareaAutosize />

    </Box>
  );
};
