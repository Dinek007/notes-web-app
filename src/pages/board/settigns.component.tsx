import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getPalette } from "../../theme/theme.palette";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import { HomePageComponent } from "./homePage.component";

export const SettingsComponent = () => {
  const [openList, setOpenList] = useState<boolean>(false);

  const foldersAndNotes = useSelector(notesSelectors.noteCategories);
  const dataCounts = useSelector(notesSelectors.foldersAndNotesCount);

  return (
    <Box
      sx={{
        backgroundColor: getPalette().secondary.dark,
        position: "relative",
        top: "5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "9px",
        boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
        padding: "50px",
        minWidth: "70vw",
        minHeight: "80vh",
        marginBottom: "10vh",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <AccountCircleIcon
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
      )}
      <Box
        sx={{
          marginTop: "50px",
          marginBottom: "70px",
        }}
      >
        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Theme
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>srgserdgf </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Main color
          </Typography>
          <Box>srgsersdfgsdgfsdgfsgsrgsdfgdgf</Box>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Default note color
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Default note size
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Default note font size
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "50px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${getPalette().secondary.light} `,
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "300px",
            }}
            variant="h5"
          >
            Default board size
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
