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
import { ChangeNoteColorComponent } from "../../components/changeNoteColor.component";
import { convertToRaw } from "draft-js";
import { OneInputComponent } from "../../components/oneInputPopup.component";
import EditIcon from "@mui/icons-material/Edit";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ConfirmPopupComponent } from "../../components/confirmPopup";
import { getPalette } from "../../theme/theme.palette";
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
  const [showChangeNoteColorComponent, setShowChangeNoteColorComponent] =
    useState<boolean>(false);
  const [changeNoteName, setChangeNoteName] = useState<boolean>(false);
  const [blink, setBlink] = useState<string>("");

  const handleCloseColorPopup = () => {
    setShowChangeNoteColorComponent(false);
  };

  const handleShowColorsPopup = () => {
    setShowChangeNoteColorComponent(true);
  };

  const handleCloseChangeNoteName = () => {
    setChangeNoteName(false);
  };

  const handleShowChangeNoteName = () => {
    setChangeNoteName(true);
  };

  const handleChangeColor = (color: string) => {
    setBlink("blink_me");
    setColor(color);
  };

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
    setBlink("");
  };

  const handleOnChange = (data) => {
    const currentHtmlContent = stateToHTML(data.getCurrentContent());

    const parsedRawContent = JSON.parse(note.content);
    const contentState = convertFromRaw(parsedRawContent);
    const htmlContent = stateToHTML(contentState);

    if (currentHtmlContent !== htmlContent) {
      setBlink("blink_me");
    } else {
      setBlink("");
    }
  };

  const handleConfirmChangeNoteName = (value) => {
    dispatch(
      notesActions.updateNote({
        noteId: note.id,
        folderId: note.folderId,
        noteElements: { name: value.value },
      })
    );
    handleCloseChangeNoteName();
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  const handleShowConfirmPopup = () => {
    setShowConfirmPopup(true);
  };

  const handleClickConfirmPopup = () => {
    handleClose();
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
        height: "95vh",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        left: "15vw",
        top: "5vh",
        zIndex: 99999999999999999999,
        overflow: "auto",
      }}
    >
      {showChangeNoteColorComponent && (
        <ChangeNoteColorComponent
          handleCloseColorPopup={handleCloseColorPopup}
          handleChangeColor={handleChangeColor}
          note={note}
        />
      )}

      {changeNoteName && (
        <OneInputComponent
          handleClosePopup={handleCloseChangeNoteName}
          handleConfirm={handleConfirmChangeNoteName}
          inputTitle="Note name"
          popupTtitle="Change note name"
        />
      )}

      {showConfirmPopup && (
        <ConfirmPopupComponent
          handleClose={handleCloseConfirmPopup}
          handleConfirm={handleClickConfirmPopup}
          popupTitle="Close note editing"
          popupContent={
            <Typography variant="h5">
              Are you sure you want to close note editing ?
              <br />
              You will lose all new changes.
            </Typography>
          }
        />
      )}

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
            onChange={(data) => {
              handleOnChange(data);
            }}
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
            onClick={handleShowColorsPopup}
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
            onClick={handleShowChangeNoteName}
          >
            <EditIcon fontSize="large" />
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
              color: "black",
              marginRight: "10px",
            }}
          >
            <Typography
              className={blink}
              style={{
                marginRight: "8px",
                fontWeight: "bold",
              }}
              variant="h5"
            >
              {blink ? "Save Changes" : "No Change"}
            </Typography>
            <SaveIcon fontSize="large" />
          </IconButton>

          <IconButton
            sx={{
              color: "black",
            }}
            onClick={() => {
              if (blink) {
                handleShowConfirmPopup();
              } else {
                handleClose();
              }
            }}
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
