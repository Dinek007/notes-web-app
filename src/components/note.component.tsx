import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { borderRadius, maxHeight } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../redux/notes/notes.slice";
import { NoteModel } from "../swagger/api";
import { Resizable } from "react-resizable";
import { Rnd } from "react-rnd";
import { sessionSelectors } from "../redux/session/session.selectors";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import EditIcon from "@mui/icons-material/Edit";
import { sessionActions } from "../redux/session/session.slice";
import { pageNames } from "../pages/notes/notesField.component";
import { EditNoteComponent } from "../pages/notes/editNote.component";
export interface NoteComponentProps {
  note: NoteModel;
}

export const NoteComponent: React.FC<NoteComponentProps> = ({ note }) => {
  const dispatch = useDispatch();

  const [noteWidth, setNoteWidth] = useState<number>(note.width);
  const [noteHeight, setNoteHeight] = useState<number>(note.height);
  const [noteColor, setNoteColor] = useState<string>(note.color);
  const [noteX, setNoteX] = useState<number>(note.x);
  const [noteY, setNoteY] = useState<number>(note.y);
  const [openEditing, setOpenEditing] = useState<boolean>(false);

  useEffect(() => {
    setNoteWidth(note.width);
    setNoteHeight(note.height);
    setNoteX(note.x);
    setNoteY(note.y);
  }, [note.x, note.y, note.width, note.height, note]);

  const handleDragStop = (x: number, y: number) => {
    setNoteX(x);
    setNoteY(y);
    dispatch(notesActions.updateNote({ id: note.id, noteElements: { x, y } }));
  };

  const handleResizeStop = (width: number, height: number) => {
    setNoteWidth(width);
    setNoteHeight(height);
    dispatch(
      notesActions.updateNote({ id: note.id, noteElements: { width, height } })
    );
  };

  const handleResize = (width: number, height: number) => {
    setNoteWidth(width);
    setNoteHeight(height);
  };

  const handleClickEdit = () => {
    setOpenEditing(true)
};

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Rnd
        size={{ width: noteWidth, height: noteHeight }}
        position={{ x: noteX, y: noteY }}
        onDragStop={(e, d) => {
          handleDragStop(d.x, d.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          handleResizeStop(ref.offsetWidth, ref.offsetHeight);
        }}
        onResize={(e, direction, ref, delta, position) => {
          handleResize(ref.offsetWidth, ref.offsetHeight);
        }}
        dragHandleClassName={"handle"}
        enableResizing={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Box
          sx={{
            width: `${noteWidth}px`,
            height: `${noteHeight}px`,
            backgroundColor: `${note.color}`,
            borderRadius: "0px, 0px, 0px, 0px",
            color: "#000000",
          }}
        >
          <Box
            className="handle"
            sx={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, rgba(217, 217, 217, 0.375) 50%, #D9D9D9 100%)",
              backgroundBlendMode: "multiply",
              height: "20px",
              textAlign: "center",
              paddingBottom: "30px",
            }}
          >
            <Typography variant="h6">{note.name}</Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              right: "0px",
              top: "0px",
              color: "black",
            }}
            onClick={handleClickEdit}
          >
            <EditIcon />
          </IconButton>
          <Box
            sx={{
              padding: "15px",
            }}
          >
            <Typography variant="h6">{note.content}</Typography>
          </Box>

          <SouthEastIcon
            sx={{
              position: "absolute",
              right: "0px",
              bottom: "0px",
            }}
          />
        </Box>
      </Rnd>

      {openEditing && (<EditNoteComponent note={note}/>)}
    </Box>
  );
};
