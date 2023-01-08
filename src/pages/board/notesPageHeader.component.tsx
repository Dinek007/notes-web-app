import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../redux/notes/notes.slice";
import { sessionSelectors } from "../../redux/session/session.selectors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  currentActionNames,
  currentCategoryNames,
  sessionActions,
} from "../../redux/session/session.slice";
import { getPalette } from "../../theme/theme.palette";
import { ConfirmPopupComponent } from "../../components/confirmPopup";
import { OneInputComponent } from "../../components/oneInputPopup.component";

export const NotesPageHeaderComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [showRemoveCategory, setShowRemoveCategory] = useState<boolean>(false);
  const [openRemoveCategory, setOpenRemoveCategory] = useState<boolean>(false);

  const [addNote, setAddNote] = useState<boolean>(false);
  const [openAddNote, setOpenAddNote] = useState<boolean>(false);

  const currentCategory = useSelector(sessionSelectors.currentCategory);
  const currentAction = useSelector(sessionSelectors.currentAction);
  const addNoteStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.addingNote)
  );
  const removeCategoryStatus = useSelector(
    sessionSelectors.actionStatus(currentActionNames.removingFolder)
  );

  const handleOpenSettings = () => {
    setAnchorEl(null);
    dispatch(
      sessionActions.setCurrentCategory({
        id: "",
        name: currentCategoryNames.settings,
      })
    );
  };

  const handleOpenChangeLogs = () => {
    setAnchorEl(null);
    dispatch(
      sessionActions.setCurrentCategory({
        id: "",
        name: currentCategoryNames.changeLog,
      })
    );
  };

  const handleGoHome = () => {
    dispatch(
      sessionActions.setCurrentCategory({
        id: "",
        name: currentCategoryNames.home,
      })
    );
  };

  const handleClickConfirmPopup = () => {
    dispatch(notesActions.removeCategory(currentCategory.id));
  };

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
    if (!showRemoveCategory && !removeCategoryStatus) {
      setOpenRemoveCategory(false);
    }
    if (showRemoveCategory) {
      setOpenRemoveCategory(true);
    }
  }, [removeCategoryStatus, showRemoveCategory]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "5vh",
        width: "85vw",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: theme.palette.secondary.dark,
      }}
    >
      {openAddNote && (
        <OneInputComponent
          handleClosePopup={() => setAddNote(false)}
          handleConfirm={handleConfirmAddNote}
          inputTitle="Note name"
          popupTtitle="Add new note"
          isLoading={addNoteStatus}
        />
      )}

      {openRemoveCategory && (
        <ConfirmPopupComponent
          handleClose={() => setShowRemoveCategory(false)}
          handleConfirm={handleClickConfirmPopup}
          popupTitle="Remove category"
          isLoading={removeCategoryStatus}
          popupContent={
            <Typography variant="h5">
              Are you sure you want to delete category ?
              <br />
              You will lose all the notes located in
              <text style={{ color: theme.palette.primary.light }}>
                {" " + currentCategory.name}
              </text>
              .
            </Typography>
          }
        />
      )}
      <IconButton onClick={handleGoHome}>
        <HomeIcon
          fontSize="large"
          style={{
            marginLeft: "25px",
          }}
        />
      </IconButton>
      <ArrowForwardIosIcon
        fontSize="small"
        style={{
          marginLeft: "10px",
        }}
      />
      <Typography
        style={{
          marginLeft: "10px",
        }}
        variant="h5"
      >
        {currentCategory.name}
      </Typography>

      {currentAction && (
        <>
          <ArrowForwardIosIcon
            fontSize="small"
            style={{
              marginLeft: "10px",
            }}
          />
          <Typography
            style={{
              marginLeft: "10px",
            }}
            variant="h5"
          >
            {currentAction}
          </Typography>
        </>
      )}

      <Box
        sx={{
          position: "absolute",
          right: "20px",
        }}
      >
        {currentCategory.id && (
          <>
            <IconButton onClick={() => setAddNote(true)}>
              <NoteAddIcon fontSize="large" />
              <Typography
                style={{
                  marginRight: "30px",
                  marginLeft: "12px",
                }}
                variant="h6"
              >
                Add Note
              </Typography>
            </IconButton>

            <IconButton onClick={() => setShowRemoveCategory(true)}>
              <DeleteForeverIcon fontSize="large" />

              <Typography
                style={{
                  marginRight: "30px",
                  marginLeft: "10px",
                }}
                variant="h6"
              >
                Remove Category
              </Typography>
            </IconButton>
          </>
        )}
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem sx={{ color: "black" }} onClick={handleOpenSettings}>
            <Typography variant="h5">Settings </Typography>
          </MenuItem>
          <MenuItem sx={{ color: "black" }} onClick={handleOpenChangeLogs}>
            <Typography variant="h5">Change logs</Typography>
          </MenuItem>
          <MenuItem sx={{ color: "black" }} onClick={handleClose}>
            <Typography variant="h5">Log out </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
