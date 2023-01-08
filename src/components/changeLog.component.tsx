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
      Fixed: ["colors in light mode", "moving notes out of board"],
      Added: [
        "board height",
        "menu with settings and logout options",
        "notes and font sizes in settings",
        "change logs",
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
            <Typography variant="h1"> {version} </Typography>
            {Object.keys(changeLogs[version]).map((category: string) => {
              return (
                <Box
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="h4"> {category} </Typography>

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
