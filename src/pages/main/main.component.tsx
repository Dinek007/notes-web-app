import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { navigationActions } from '../../redux/navigation/navigation.slice'
import { RouterPaths } from '../../router/router.paths'


export const MainComponent = () => {
    const dispatch = useDispatch()
    const [navigatePath, setNavigatePath] = useState<RouterPaths>()

    const useLogInButtonClick = () => {
        setNavigatePath(RouterPaths.Login)
    }

    const useSignUpButtonClick = () => {
        setNavigatePath(RouterPaths.SignUp)
    }

    useEffect(() => {
        dispatch(navigationActions.navigate(navigatePath))
    }, [navigatePath])

    return (
        <Box sx={{ display: 'flex' }}>
            <Typography
                style={{
                    position: 'absolute',
                    left: '188px',
                    top: '28px',
                }}
                variant='h3'>
                World of Notes
            </Typography>

            <Button
                variant='text'
                style={{
                    position: 'absolute',
                    left: '1455px',
                    top: '28px',
                }}
                onClick={useLogInButtonClick}
            >
                <Typography
                    variant='h3'>
                    Log In
                </Typography>
            </Button>

            <Button
                variant='text'
                style={{
                    position: 'absolute',
                    left: '1617px',
                    top: '28px',
                }}
                onClick={useSignUpButtonClick}
            >
                <Typography
                    variant='h3'>
                    Sign Up
                </Typography>
            </Button>

            <img
                src='src/assets/mainPageIcon.png'
                style={{
                    position: 'absolute',
                    left: '36px',
                    top: "-10px"
                }}
            />

            <Typography
                style={{
                    position: 'absolute',
                    left: '970px',
                    top: ' 397px',
                }}
                variant='h2'>
                Have all your notes always at hand.
            </Typography>

            <Typography
                style={{
                    position: 'absolute',
                    left: '970px',
                    top: '469px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                variant='h3'>
                Notes manager that you always needed.
            </Typography>
            <Button
                style={{
                    position: 'absolute',
                    left: '970px',
                    top: '600px',
                    width: '305px',
                    height: '83px'
                }}
                onClick={useSignUpButtonClick}
            >
                <Typography variant='h3'> Get Started </Typography>
            </Button>
        </Box>
    )
}