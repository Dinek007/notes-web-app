import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { NoteModel } from "../../swagger/api";
import { HomePageComponent } from "./homePage.component";
import { SettingsComponent } from "./settigns.component";
import { NoteComponent } from "../../components/note.component";
import { ChangeLogComponent } from "../../components/changeLog.component";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { currentActionNames } from "../../redux/session/session.slice";
import { notesActions } from "../../redux/notes/notes.slice";
import { OneInputComponent } from "../../components/oneInputPopup.component";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export enum pageNames {
  addNote = "addNote",
  notes = "notes",
  loading = "loading",
  home = "Home",
  settings = "Settings",
  changeLog = "Change logs",
}

export interface CategoryListComponentProps {}

export const NotesFieldComponent: React.FC<
  CategoryListComponentProps
> = ({}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [addNote, setAddNote] = useState<boolean>(false);
  const [openAddNote, setOpenAddNote] = useState<boolean>(false);

  const [pageToShow, setPageToShow] = useState<string>("");

  const areFoldersAndNotesLoading = useSelector(
    sessionSelectors.foldersAndNotesLoading
  );
  const currentCategoryData = useSelector(notesSelectors.currentCategoryNotes);
  const currentCategoryName = useSelector(sessionSelectors.currentCategory);
  const currentCategoryNotes = currentCategoryData
    ? Object.values(currentCategoryData.notes.entities)
    : [];
  const currentAction = useSelector(sessionSelectors.currentAction);
  const addNoteStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.addingNote)
  );

  const foldersAndNotes = useSelector(notesSelectors.noteCategories);
  const dataCounts = useSelector(notesSelectors.foldersAndNotesCount);

  const handleConfirmAddNote = (value) => {
    dispatch(notesActions.newNote(value.value));
    setAddNote(false);
  };

  useEffect(() => {
    if (!addNote && !addNoteStatus) {
      setOpenAddNote(false);
    }
    if (addNote) {
      setOpenAddNote(true);
    }
  }, [addNoteStatus, addNote]);

  useEffect(() => {
    if (areFoldersAndNotesLoading) {
      setPageToShow(pageNames.loading);
    } else {
      if (currentCategoryNotes.length) {
        setPageToShow(pageNames.notes);
      } else {
        if (currentCategoryName?.id) {
          setPageToShow(pageNames.addNote);
        } else {
          if (currentCategoryName?.name === pageNames.home) {
            setPageToShow(pageNames.home);
          }
          if (currentCategoryName?.name === pageNames.settings) {
            setPageToShow(pageNames.settings);
          }
          if (currentCategoryName?.name === pageNames.changeLog) {
            setPageToShow(pageNames.changeLog);
          }
        }
      }
    }
  }, [currentCategoryName, areFoldersAndNotesLoading, currentAction]);

  return (
    <Box
      id={"notesContainer"}
      sx={{
        display: "flex",
        backgroundColor: theme.palette.secondary.main,
        width: "85vw",
        height: "95vh",
        justifyContent: "flex-start",
        alignItems: "baseline",
        alignContent: "center",
        overflow: "auto",
      }}
    >
      {pageToShow === pageNames.loading && (
        <Box
          sx={{
            left: "50%",
            top: "50%",
            position: "relative",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {pageToShow === pageNames.notes && (
        <Box sx={{ height: "2160px", left: "0px" }}>
          {currentCategoryNotes.map((note: NoteModel) => {
            return <NoteComponent key={note.id} note={note} />;
          })}
        </Box>
      )}

      {pageToShow === pageNames.home && (
        <Box
          sx={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: "9px",
            boxShadow: "5px 5px 20px 5px #222222",
            padding: "50px",
            minWidth: "60vw",
            minHeight: "50vh",
          }}
        >
          <AccountCircleIcon
            style={{
              fontSize: "90px",
              color: theme.palette.primary.main,
            }}
          />

          <Typography> Damian </Typography>
          <Typography
            style={{
              marginTop: "20px",
            }}
          >
            {" "}
            Folders count: {dataCounts.folders}{" "}
          </Typography>
          <Typography> Notes count: {dataCounts.notes} </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignContent: "center",
              marginTop: "20px",
            }}
          >
            {Object.values(foldersAndNotes).map((folder) => {
              return <HomePageComponent folder={folder} />;
            })}
          </Box>
        </Box>
      )}

      {pageToShow === pageNames.addNote && (
        <>
          {openAddNote && (
            <OneInputComponent
              handleClosePopup={() => setAddNote(false)}
              handleConfirm={handleConfirmAddNote}
              inputTitle="Note name"
              popupTtitle="Add new note"
              isLoading={addNoteStatus}
            />
          )}
          <Box
            sx={{
              position: "relative",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IconButton onClick={() => setAddNote(true)}>
              <NoteAddIcon sx={{ fontSize: "90px" }} />
              <Typography
                style={{
                  marginRight: "30px",
                  marginLeft: "12px",
                  fontSize: "30px",
                }}
                variant="h6"
              >
                Add Note
              </Typography>
            </IconButton>
          </Box>
        </>
      )}

      {pageToShow === pageNames.changeLog && <ChangeLogComponent />}

      {pageToShow === pageNames.settings && <SettingsComponent />}
    </Box>
  );
};
