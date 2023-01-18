import { IconButton, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import {
  CreateReoccurringNotificationDto,
  NoteModel,
  NotificationModel,
} from "../../swagger/api";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MUIRichTextEditor from "mui-rte";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../redux/notes/notes.slice";
import { colorShade, invertColor } from "../../common";
import { ChangeNoteColorComponent } from "../../components/changeNoteColor.component";
import { OneInputComponent } from "../../components/oneInputPopup.component";
import EditIcon from "@mui/icons-material/Edit";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ConfirmPopupComponent } from "../../components/confirmPopup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { currentActionNames } from "../../redux/session/session.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { getPalette } from "../../theme/theme.palette";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ReminderComponent } from "../../components/reminder.component";

export interface EditNoteComponentProps {
  note: NoteModel;
  handleClose: () => void;
}

export const EditNoteComponent: React.FC<EditNoteComponentProps> = ({
  note,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [color, setColor] = useState<string>(note.color);
  const [showChangeNoteColorComponent, setShowChangeNoteColorComponent] =
    useState<boolean>(false);
  const [changeNoteName, setChangeNoteName] = useState<boolean>(false);
  const [blink, setBlink] = useState<string>("");
  const [blinkColor, setBlinkColor] = useState<string>("");

  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [removeNote, setRemoveNote] = useState<boolean>(false);
  const [openRemoveNote, setOpenRemoveNote] = useState<boolean>(false);

  const [reminder, setReminder] = useState<boolean>(false);
  const [openReminder, setOpenReminder] = useState<boolean>(false);

  const removeNoteActionStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.removingNote)
  );

  const setReminderActionStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.setReminder)
  );

  const removeReminderActionStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.removeReminder)
  );

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
    setBlinkColor("");
  };

  const handleChangeColor = (color: string) => {
    if (color === note.color) {
      setBlinkColor("");
    } else {
      setBlinkColor("blink_me");
    }
    setColor(color);
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
    setChangeNoteName(false);
  };

  const handleConfirmRemoveNote = () => {
    dispatch(notesActions.removeNote(note.id));
    setRemoveNote(false);
  };

  const handleOpenReminder = () => {
    setReminder(true);
  };

  const handleSetReminder = (value, type) => {
    dispatch(
      notesActions.sendReminder({
        date: value,
        name: note.name,
        noteId: note.id,
        type: type,
      })
    );
  };

  useEffect(() => {
    if (!reminder && !removeNoteActionStatus) {
      setOpenReminder(false);
    }
    if (reminder) {
      setOpenReminder(true);
    }
  }, [removeNoteActionStatus, reminder]);

  useEffect(() => {
    if (!removeNote && !setReminderActionStatus) {
      setOpenRemoveNote(false);
    }
    if (removeNote) {
      setOpenRemoveNote(true);
    }
  }, [setReminderActionStatus, removeNote]);

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
        zIndex: "100000000",
        overflow: "auto",
      }}
    >
      {showChangeNoteColorComponent && (
        <ChangeNoteColorComponent
          handleCloseColorPopup={() => setShowChangeNoteColorComponent(false)}
          handleChangeColor={handleChangeColor}
          note={note}
        />
      )}

      {changeNoteName && (
        <OneInputComponent
          handleClosePopup={() => setChangeNoteName(false)}
          handleConfirm={handleConfirmChangeNoteName}
          inputTitle="Note name"
          popupTtitle="Change note name"
          isLoading={false}
        />
      )}

      {showConfirmPopup && (
        <ConfirmPopupComponent
          handleClose={() => setShowConfirmPopup(false)}
          handleConfirm={() => handleClose()}
          popupTitle="Close note editing"
          popupContent={
            <Typography variant="h5">
              Are you sure you want to close note editing ?
              <br />
              You will lose all new changes.
            </Typography>
          }
          isLoading={false}
        />
      )}

      {openRemoveNote && (
        <ConfirmPopupComponent
          handleClose={() => setRemoveNote(false)}
          handleConfirm={() => handleConfirmRemoveNote()}
          popupTitle="Remove note"
          isLoading={removeNoteActionStatus}
          popupContent={
            <Typography variant="h5">
              Are you sure you want to delete
              <text style={{ color: theme.palette.primary.light }}>
                {" " + note.name + " "}
              </text>
              note?
              <br />
              You will lose it forever.
            </Typography>
          }
        />
      )}

      {openReminder && (
        <ReminderComponent
          handleClosePopup={() => setReminder(false)}
          handleConfirm={handleSetReminder}
          isLoading={setReminderActionStatus || removeReminderActionStatus}
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
            inlineToolbar={false}
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
            onClick={() => handleOpenReminder()}
          >
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{
              color: "black",
            }}
            onClick={() => setShowChangeNoteColorComponent(true)}
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
            onClick={() => setChangeNoteName(true)}
          >
            <EditIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{
              color: "black",
            }}
            onClick={() => setRemoveNote(true)}
          >
            <DeleteForeverIcon fontSize="large" />
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
              className={blink ? blink : blinkColor}
              style={{
                marginRight: "8px",
                fontWeight: "bold",
              }}
              variant="h5"
            >
              {blink || blinkColor ? "Save Changes" : "No Change"}
            </Typography>
            <SaveIcon fontSize="large" />
          </IconButton>

          <IconButton
            sx={{
              color: "black",
            }}
            onClick={() => {
              if (blink || blinkColor) {
                setShowConfirmPopup(true);
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
