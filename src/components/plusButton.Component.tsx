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
        <Box sx={{
            display: 'flex',
        }}>
            <Button
                style={{
                    width: '90px',
                    height: '90px',
                }}
                onClick={onclick}
            >
                {text}
            </Button>
        </Box>
    )
}