import { Box, Typography } from "@mui/material";
import React from "react";

export const LoginErrorComponent: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return;

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Typography variant="h6" color={"#ff0055"}>
        {error}
      </Typography>
    </Box>
  );
};
