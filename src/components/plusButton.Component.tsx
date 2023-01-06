import { Box, Button } from '@mui/material'
import React from 'react'

export interface PlusButtonComponentProps {
    onclick: () => void
    text: string
}

export const PlusButtonComponent: React.FC<PlusButtonComponentProps> = ({
    onclick,
    text
}) => {

    return (
      <Box
        sx={{
          display: "flex",
          boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
        }}
      >
        <Button
          style={{
            width: "90px",
            height: "90px",
            boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
          }}
          onClick={onclick}
        >
          {text}
        </Button>
      </Box>
    );
}