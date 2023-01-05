import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { notesActions } from '../../redux/notes/notes.slice'
import { sessionSelectors } from '../../redux/session/session.selectors'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { currentCategoryNames, sessionActions } from '../../redux/session/session.slice'

export const NotesPageHeaderComponent = () => {
    const dispatch = useDispatch()

    const currentCategory = useSelector(sessionSelectors.currentCategory)
    const currentAction = useSelector(sessionSelectors.currentAction)

    const handleRemoveCategory = () => {
        dispatch(notesActions.removeCategory(currentCategory.id))
    }

    const handleOpenSettings = () => {
        dispatch(sessionActions.setCurrentCategory({ id: '', name: currentCategoryNames.settings }))
    }

    const handleGoHome = () => {
        dispatch(sessionActions.setCurrentCategory({ id: '', name: currentCategoryNames.home }))
    }

    const handleAddNote = () => {
        dispatch(notesActions.newNote({}))
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '8vh',
            width: '85vw',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'center',
            borderBottom: '1px solid #666666'
        }}>
            <IconButton onClick={handleGoHome}>

                <HomeIcon
                    fontSize='large'
                    style={{
                        marginLeft: '25px'
                    }}
                />
            </IconButton>
            <ArrowForwardIosIcon
                fontSize='small'
                style={{
                    marginLeft: "10px"
                }}
            />
            <Typography
                style={{
                    marginLeft: '10px'
                }}
                variant="h5">
                {currentCategory.name}
            </Typography>

            {currentAction && (<>
                <ArrowForwardIosIcon
                    fontSize='small'
                    style={{
                        marginLeft: "10px"
                    }}
                />
                <Typography
                    style={{
                        marginLeft: '10px'
                    }}
                    variant="h5">
                    {currentAction}
                </Typography>
            </>)}

            <Box sx={{
                position: 'absolute',
                right: '20px'
            }} >
                {currentCategory.id && (

                    <>
                        <IconButton onClick={handleAddNote}>
                            <NoteAddIcon fontSize='large' />
                            <Typography
                                style={{
                                    marginRight: '30px',
                                    marginLeft: '12px'

                                }}
                                variant="h6">
                                Add Note
                            </Typography>
                        </IconButton>

                        <IconButton onClick={handleRemoveCategory}>
                            <DeleteForeverIcon fontSize='large' />

                            <Typography
                                style={{
                                    marginRight: '30px',
                                    marginLeft: '10px'
                                }}
                                variant="h6">
                                Remove Category
                            </Typography>
                        </IconButton>
                    </>)}
                <IconButton onClick={handleOpenSettings}>
                    <SettingsIcon fontSize='large' />
                </IconButton>

            </Box>
        </Box >
    )
}