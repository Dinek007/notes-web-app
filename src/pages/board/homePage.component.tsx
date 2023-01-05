import React from 'react'
import { Box, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Dictionary } from '@reduxjs/toolkit'
import { NoteCategory } from '../../redux/notes/notes.types'
import { getPalette } from '../../theme/theme.palette'

export interface HomePageComponentProps {
    folder: NoteCategory
}

export const HomePageComponent: React.FC<HomePageComponentProps> = ({
    folder
}) => {
    const [open, setOpen] = React.useState(true);

    return (
        <Box
            sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
                padding: '0px'
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                    backgroundColor: getPalette().primary.main,
                    height: '55px'
                }}
            >
                <ListItemText
                    primary={folder.name}
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    sx={{ my: 0, }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open &&
                Object.values(folder.notes.entities).map((note) => (
                    <ListItemButton
                        key={note.name}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemText
                            primary={note.name}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    )
}

