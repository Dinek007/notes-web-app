import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { NoteModel } from "../../swagger/api";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { notesActions } from "../../redux/notes/notes.slice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { HomePageComponent } from "./homePage.component";
import { SettingsComponent } from "./settigns.component";
import { NoteComponent } from "../../components/note.component";
import { EditNoteComponent } from "./editNote.component";

export enum pageNames {
  addNote = "addNote",
  notes = "notes",
  loading = "loading",
  home = "Home",
  settings = "Settings",
}

export interface CategoryListComponentProps {}

export const NotesFieldComponent: React.FC<
  CategoryListComponentProps
> = ({}) => {
  const dispatch = useDispatch();
  const [pageToShow, setPageToShow] = useState<string>("");

  const foldersAndNotes = useSelector(notesSelectors.noteCategories);
  const areFoldersAndNotesLoading = useSelector(
    sessionSelectors.foldersAndNotesLoading
  );
  const currentCategoryData = useSelector(notesSelectors.currentCategoryNotes);
  const currentCategoryName = useSelector(sessionSelectors.currentCategory);
  const currentCategoryNotes = currentCategoryData
    ? Object.values(currentCategoryData.notes.entities)
    : [];
  const dataCounts = useSelector(notesSelectors.foldersAndNotesCount);
  const currentAction = useSelector(sessionSelectors.currentAction);

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
        }
      }
    }
  }, [currentCategoryName, areFoldersAndNotesLoading, currentAction]);

  const handleAddNote = () => {
    dispatch(notesActions.newNote({}));
  };

  return (
    <Box
      id={"notesContainer"}
      sx={{
        display: "flex",
        backgroundColor: getPalette().secondary.main,
        width: "85vw",
        height: "92vh",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        overflow: "auto",
      }}
    >
      {pageToShow === pageNames.loading && <CircularProgress />}

      {pageToShow === pageNames.addNote && (
        <IconButton size="large" onClick={handleAddNote}>
          <NoteAddIcon fontSize="large" />
          <Typography
            style={{
              marginRight: "30px",
              marginLeft: "12px",
            }}
            variant="h6"
          >
            Add first note
          </Typography>
        </IconButton>
      )}

      {pageToShow === pageNames.notes &&
        currentCategoryNotes.map((note: NoteModel) => {
          return <NoteComponent key={note.id} note={note} />;
        })}

      {pageToShow === pageNames.home && (
        <Box
          sx={{
            position: "relative",
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
              color: getPalette().primary.main,
            }}
          />
          <Typography> Damian </Typography>
          <Typography
            style={{
              marginTop: "20px",
            }}
          >
            Folders count: {dataCounts.folders}
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

      {pageToShow === pageNames.settings && <SettingsComponent />}
    </Box>
  );
};
