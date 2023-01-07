import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { getPalette } from "../theme/theme.palette";
import CloseIcon from "@mui/icons-material/Close";

export interface PopupComponentProps {
  handleClosePopup: () => void;
  title: string;
  children: any;
}

export const PopupComponent: React.FC<PopupComponentProps> = ({
  handleClosePopup,
  title,
  children,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        background: "#000000e8",
        width: "100%",
        height: "100vh",
        top: "0",
        left: "0",
        zIndex: "10000000000000000000000000000000",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: getPalette().secondary.dark,
          borderRadius: "8px",
          padding: "35px",
          paddingTop: "60px",
          paddingBottom: "50px",
          boxShadow: `rgba(0,0,0, 0.24) 0px 4px 8px 0px, rgba(0,0,0, 0.64) 0px 4px 32px 0px`,
        }}
      >
        <IconButton
          style={{
            position: "fixed",
            right: "10px",
            top: "10px",
            fontSize: "25px",
            color: "white",
          }}
          onClick={handleClosePopup}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          style={{
            marginBottom: "60px",
          }}
          variant="h4"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
