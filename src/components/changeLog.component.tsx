import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

export const ChangeLogComponent = ({}) => {
  const changeLogs = {
    "0.0.0 - 07 January 2023": {
      Fixed: ["_"],
      Added: ["all"],
      Removed: ["_"],
    },
    "0.0.1 - 08 January 2023": {
      Fixed: [
        "lighter colors in light mode",
        "moving notes out of board",
        "start page responsiveness",
        "login page responsiveness",
        "sign up page responsiveness",
        "clear properly state when refreash/logout",
      ],
      Added: [
        "board fixed height",
        "menu dialog window",
        "notes and font sizes settings",
        "change logs page",
        "log out option",
      ],
      Removed: ["inline toolbar while editing"],
    },
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        position: "relative",
        top: "5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        borderRadius: "9px",
        boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
        padding: "50px",
        minHeight: "80vh",
        marginBottom: "10vh",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      {Object.keys(changeLogs).map((version: string) => {
        return (
          <Box
            sx={{
              marginBottom: "50px",
            }}
          >
            <Typography variant="h3"> {version} </Typography>
            {Object.keys(changeLogs[version]).map((category: string) => {
              return (
                <Box
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="h5"> {category} </Typography>

                  <ul>
                    {changeLogs[version][category].map((name: string) => {
                      return (
                        <li>
                          <Typography variant="h6"> {name}</Typography>
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
