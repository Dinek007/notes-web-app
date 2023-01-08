import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import { useSelector } from "react-redux";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { NoteModel } from "../../swagger/api";
import { HomePageComponent } from "./homePage.component";
import { SettingsComponent } from "./settigns.component";
import { NoteComponent } from "../../components/note.component";
import { ChangeLogComponent } from "../../components/changeLog.component";

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
  const theme = useTheme();

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

      {pageToShow === pageNames.home && <></>}
      {pageToShow === pageNames.changeLog && <ChangeLogComponent />}

      {pageToShow === pageNames.settings && <SettingsComponent />}
    </Box>
  );
};
