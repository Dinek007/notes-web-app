import React from 'react'
import { useForm } from 'react-hook-form'

import { AddCategoryValues } from '../pages/notes/main.field'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { ControlledInput } from './TextInput/TextInput.controlled'
import { defaultAddCategoryValues } from '../pages/notes/main.field'

import { getPalette } from '../theme/theme.palette'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { notesActions } from '../redux/notes/notes.slice'
import { useDispatch } from 'react-redux'

export interface AddItemComponentProps {
    handleCloseAddCategoryPopup: () => void
}

export const AddItemComponent: React.FC<AddItemComponentProps> = ({
    handleCloseAddCategoryPopup
}) => {
    const dispatch = useDispatch()

    const { handleSubmit, control, formState } = useForm<AddCategoryValues>({
        defaultValues: defaultAddCategoryValues,
        mode: "onChange"
    })

    const handleAddCategoryConfirm = (values: AddCategoryValues) => {
        console.log('sieeema')
        dispatch(notesActions.newCategory({
            name: values.title,
            description: values.description
        }))
        handleCloseAddCategoryPopup()
    }


    return (
        <Box sx={{
            position: 'fixed',
            background: '#00000050',
            width: '100%',
            height: '100vh',
            top: '0',
            left: '0',
            zIndex: '1'
        }}>
            <Box sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                top: '300px',
                left: '50%',
                transform: 'translate(-50%, 0)',
                backgroundColor: getPalette().primary.main,
                borderRadius: '20px',
                padding: '35px'
            }}>
                <IconButton
                    style={{
                        position: 'fixed',
                        right: '10px',
                        top: '10px',
                        fontSize: '25px',
                        color: 'white'
                    }}
                    onClick={handleCloseAddCategoryPopup}
                >
                    <HighlightOffIcon />
                </IconButton>

                <Typography
                    style={{
                        marginBottom: '40px',
                    }}
                    variant='h4'>
                    Create new category
                </Typography>

                <form
                    onSubmit={handleSubmit(handleAddCategoryConfirm)}>
                    <ControlledInput
                        style={{
                            marginBottom: '20px',
                            width: "384px",
                            height: "54px"
                        }}
                        name={"title"}
                        title="Category name"
                        control={control}
                        type='text'
                    />
                    <ControlledInput
                        style={{
                            marginBottom: '10px',
                            width: "384px",
                            height: "54px"
                        }}
                        name={"description"}
                        title="Description"
                        control={control}
                        type='text'
                    />
                    <Button
                        style={{
                            marginTop: '40px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            width: '203px',
                            height: '55px',
                            backgroundColor: getPalette().secondary.main,
                        }}
                        type="submit"
                    >
                        <Typography variant='h4'>
                            Confirm
                        </Typography>
                    </Button>


                </form>
            </Box>
        </Box >
    )
}