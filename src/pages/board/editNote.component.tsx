import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { NoteModel } from "../../swagger/api";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MUIRichTextEditor from "mui-rte";
import { useDispatch } from "react-redux";
import { notesActions } from "../../redux/notes/notes.slice";
import { colorShade, invertColor } from "../../common";

export interface EditNoteComponentProps {
  note: NoteModel;
  handleClose: () => void;
}

export const EditNoteComponent: React.FC<EditNoteComponentProps> = ({
  note,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState<string>(note.color);

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.save();
  };
  const handleSaveClick = (data) => {
    dispatch(
      notesActions.updateNote({
        noteId: note.id,
        folderId: note.folderId,
        noteElements: { content: `${data}`, color },
      })
    );
  };

  const darkNoteColor = colorShade(color, -30);
  const lightNoteColor = colorShade(color, 65);
  const invertedNoteColor = invertColor(color);

  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: `${color}`,
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
          background: `linear-gradient(${color}, ${darkNoteColor})`,
          backgroundBlendMode: "multiply",
        }}
      >
        {/* LEFT */}

        <Box
          sx={{
            position: "absolute",
            left: "2%",
            color: "black",
            top: "50%",
            transform: "translate(0, -50%)",
          }}
        >
          <MUIRichTextEditor
            controls={[
              "bold",
              "italic",
              "underline",
              "numberList",
              "bulletList",
            ]}
            ref={ref}
            customControls={[]}
            onSave={(data) => {
              handleSaveClick(data);
            }}
            label="Type something here..."
            inlineToolbar={true}
            defaultValue={note.content}
          />
        </Box>

        {/* CENTER */}

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        >
          <IconButton
            sx={{
              color: "black",
            }}
          >
            <ColorLensIcon fontSize="large" />
          </IconButton>

          <Typography
            color={"black"}
            variant={"body2"}
            sx={{
              paddingRight: "20px",
              paddingLeft: "20px",
              position: "relative",
              top: "3px",
            }}
          >
            {note.name}
          </Typography>

          <IconButton
            sx={{
              color: "black",
            }}
          >
            <NotificationsIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* RIGHT */}

        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translate(0, -50%)",
            color: "black",
          }}
        >
          <IconButton
            onClick={handleClick}
            sx={{
              color: invertedNoteColor,
              marginRight: "10px",
            }}
          >
            <Typography
              style={{
                marginRight: "8px",
                fontWeight: "bold",
              }}
              variant="h5"
            >
              Save Changes
            </Typography>
            <SaveIcon fontSize="large" />
          </IconButton>

          <IconButton
            sx={{
              color: "black",
            }}
            onClick={handleClose}
          >
            {/* <Typography
              style={{
                marginRight: "8px",
              }}
              variant="h6"
            >
              Close
            </Typography> */}
            <HighlightOffIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* zmienic ikone zapisu na bialy kiedy jest edytowane */}
    </Box>
  );
};
