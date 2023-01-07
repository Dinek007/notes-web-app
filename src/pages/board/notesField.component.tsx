import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import { useSelector } from "react-redux";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { NoteModel } from "../../swagger/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { HomePageComponent } from "./homePage.component";
import { SettingsComponent } from "./settigns.component";
import { NoteComponent } from "../../components/note.component";

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
  const [pageToShow, setPageToShow] = useState<string>("");
  const [openList, setOpenList] = useState<boolean>(false);

  const foldersAndNotes = useSelector(notesSelectors.noteCategories);
  const dataCounts = useSelector(notesSelectors.foldersAndNotesCount);
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
        }
      }
    }
  }, [currentCategoryName, areFoldersAndNotesLoading, currentAction]);

  return (
    <Box
      id={"notesContainer"}
      sx={{
        display: "flex",
        backgroundColor: getPalette().secondary.main,
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
          <CircularProgress />{" "}
        </Box>
      )}

      {pageToShow === pageNames.notes &&
        currentCategoryNotes.map((note: NoteModel) => {
          return <NoteComponent key={note.id} note={note} />;
        })}

      {pageToShow === pageNames.home && (
        <>
          {/* <AccountCircleIcon
            style={{
              fontSize: "90px",
              color: getPalette().primary.main,
            }}
          />
          <Typography variant="h4"> Damian </Typography>
          <Typography
            style={{
              marginTop: "20px",
            }}
          >
            Folders count: {dataCounts.folders}
          </Typography>
          <Typography> Notes count: {dataCounts.notes} </Typography>
          <Button
            sx={{
              marginTop: "20px",
            }}
            onClick={() => {
              if (openList) {
                setOpenList(false);
              } else {
                setOpenList(true);
              }
            }}
          >
            <Typography variant="h5">
              {openList ? "Close" : "Open"} Notes List
            </Typography>
          </Button>
          {openList && (
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
          )} */}
        </>
      )}

      {pageToShow === pageNames.settings && <SettingsComponent />}
    </Box>
  );
};
