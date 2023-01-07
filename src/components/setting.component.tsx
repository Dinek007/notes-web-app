import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { getPalette } from "../theme/theme.palette";

export interface SettingComponentProps {
  children: any;
  title: string;
}

export const SettingComponent: React.FC<SettingComponentProps> = ({
  children,
  title,
}) => {
  return (
    <Box
      sx={{
        marginTop: "50px",
        paddingBottom: "10px",
        borderBottom: `2px solid ${getPalette().secondary.light} `,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Typography
        sx={{
          width: "400px",
        }}
        variant="h5"
      >
        {title}
      </Typography>

      <Box sx={{}}>{children}</Box>
    </Box>
  );
};
