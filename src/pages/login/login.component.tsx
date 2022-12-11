import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { LoginValues } from './login.fields'
import { Box, Button } from '@mui/material'
import { ControlledInput } from '../../components/TextInput/TextInput.controlled'
import { defaultLoginValues } from './login.fields'
import { sessionActions } from '../../redux/session/session.slice'

export const LoginComponent = () => {
    const dispatch = useDispatch()

    const { handleSubmit, control, formState } = useForm<LoginValues>({
        defaultValues: defaultLoginValues,
        mode: "onChange"
    })

    // const disabled = formState.isSubmitted && !formState.isValid

    const buttonClick = async (values: LoginValues) => {
        dispatch(sessionActions.login(values))
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <form onSubmit={handleSubmit(buttonClick)}>
                <ControlledInput
                    name={"email"}
                    title="Entity"
                    control={control}
                    type='email'
                />
                <ControlledInput
                    name={"password"}
                    title="Entity"
                    control={control}
                    type='password'
                />
                <Button
                    type="submit"
                />
            </form>
        </Box>
    )
}