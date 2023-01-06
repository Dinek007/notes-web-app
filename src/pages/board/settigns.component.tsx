import React from 'react'
import { Box } from '@mui/material'
import { getPalette } from '../../theme/theme.palette'

export const SettingsComponent = () => {

    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: getPalette().secondary.main,
          width: "85vw",
          height: "95vh",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderBottom: "1px solid black",
        }}
      >
        sfglkdfkgk;
      </Box>
    );
}

