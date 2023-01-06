import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../redux/notes/notes.slice";
import { NoteModel } from "../swagger/api";
import { Rnd } from "react-rnd";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import EditIcon from "@mui/icons-material/Edit";
import { EditNoteComponent } from "../pages/board/editNote.component";
import { colorShade } from "../common";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { notesSelectors } from "../redux/notes/notes.selectors";
export interface NoteComponentProps {
  note: NoteModel;
}

export const NoteComponent: React.FC<NoteComponentProps> = ({ note }) => {
  const dispatch = useDispatch();
  const biggestIndex = useSelector(notesSelectors.biggestZIndex);

  const [noteWidth, setNoteWidth] = useState<number>(note.width);
  const [noteHeight, setNoteHeight] = useState<number>(note.height);
  const [noteX, setNoteX] = useState<number>(note.x);
  const [noteY, setNoteY] = useState<number>(note.y);
  const [openEditing, setOpenEditing] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState<number>(note.zIndex);

  const darkNoteColor = colorShade(note.color, -30);

  useEffect(() => {
    setNoteWidth(note.width);
    setNoteHeight(note.height);
    setNoteX(note.x);
    setNoteY(note.y);
    setZIndex(note.zIndex);
  }, [note.x, note.y, note.width, note.height, note]);

  const handleDragStop = (x: number, y: number) => {
    setNoteX(x);
    setNoteY(y);
    dispatch(
      notesActions.updateNote({
        noteId: note.id,
        folderId: note.folderId,
        noteElements: { x, y, zIndex: zIndex },
      })
    );
  };

  const handleResizeStop = (width: number, height: number) => {
    setNoteWidth(width);
    setNoteHeight(height);

    dispatch(
      notesActions.updateNote({
        noteId: note.id,
        folderId: note.folderId,
        noteElements: { width, height, zIndex: zIndex },
      })
    );
  };

  const handleResize = (width: number, height: number) => {
    setNoteWidth(width);
    setNoteHeight(height);
  };

  const handleClickEdit = () => {
    setOpenEditing(true);
  };

  const handleCloseNoteEdit = () => {
    setOpenEditing(false);
  };

  const parsedRawContent = JSON.parse(note.content);
  const contentState = convertFromRaw(parsedRawContent);
  const htmlContent = stateToHTML(contentState);

  return (
    <Box
      onMouseDown={() => {
        setZIndex(biggestIndex + 1);
        dispatch(
          notesActions.updateNote({
            noteId: note.id,
            folderId: note.folderId,
            noteElements: { zIndex: biggestIndex + 1 },
          })
        );
      }}
      sx={{
        position: "relative",
        zIndex: zIndex,
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

            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;   ",
          }}
        >
          <Box
            className="handle"
            sx={{
              display: "flex",
              background: `linear-gradient(${note.color}, ${darkNoteColor})`,
              backgroundBlendMode: "multiply",
              height: "30px",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {note.name}
            </Typography>
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
              paddingLeft: "10px",
              paddingRight: "10px",
              top: "30px",
              height: " calc(100% - 50px)",
              width: `${noteWidth}px`,
              left: "0px",
              position: "absolute",
            }}
          >
            <Box
              sx={{
                width: `${noteWidth}px`,
                paddingLeft: "10px",
                paddingRight: "10px",
                height: "100%",
                inlineSize: `${noteWidth}px`,
                overflowWrap: "break-word",
                position: "absolute",
                left: "0px",
                overflowY: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Box>

          <SouthEastIcon
            sx={{
              position: "absolute",
              right: "0px",
              bottom: "0px",
            }}
            fontSize="small"
          />
        </Box>
      </Rnd>

      {openEditing && (
        <EditNoteComponent note={note} handleClose={handleCloseNoteEdit} />
      )}
    </Box>
  );
};
