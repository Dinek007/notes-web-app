import React from "react";
import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { NoteCategory } from "../../redux/notes/notes.types";
import { getPalette } from "../../theme/theme.palette";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { notesSelectors } from "../../redux/notes/notes.selectors";
import homePageImage from "../../assets/mainPageIcon.png";
import { sessionActions } from "../../redux/session/session.slice";
import { notesActions } from "../../redux/notes/notes.slice";

export interface HomePageComponentProps {}

export const HomePageComponent: React.FC<HomePageComponentProps> = ({}) => {
  const theme = useTheme();

  const username = useSelector(sessionSelectors.username);
  const categories = useSelector(notesSelectors.noteCategoriesList);
  const dispatch = useDispatch();

  const handleCategory = (category: { id: string; name: string }) => {
    dispatch(sessionActions.setCurrentCategory(category));
    dispatch(notesActions.getNotes());
  };
  return (
    <Box
      sx={{
        "&::before": {
          position: "absolute",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          content: '""',
          backgroundImage: `url(${homePageImage})`,
          backgroundSize: "auto 100%",
          opacity: "0.3",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        },
        minHeight: "70vh",

        padding: "0px",
        maxWidth: "1200px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Hello {username}!
      </Typography>

      <Typography
        variant="h3"
        sx={{
          textAlign: "left",
          marginBottom: 2,
        }}
      >
        Category List:
      </Typography>

      <Box
        sx={{
          gap: "15px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {categories.map((category) => {
          return (
            <Button
              onClick={() => handleCategory(category)}
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "150px",
                backgroundColor: `${theme.palette.secondary.main}`,
                borderRadius: "5px",
                marginBottom: "10px",
                borderBottom: `5px solid ${theme.palette.primary.main}`,
                boxShadow: "4px 4px 10px 4px #222222",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  top: "0px",
                  //   textAlign: "center",
                  fontWeight: 500,
                  width: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "15px",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {category.description}
              </Typography>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
