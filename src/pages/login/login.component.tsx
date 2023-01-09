import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { LoginValues } from './login.fields'
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ControlledInput } from "../../components/TextInput/TextInput.controlled";
import { defaultLoginValues } from "./login.fields";
import { sessionActions } from "../../redux/session/session.slice";
import { navigationActions } from "../../redux/navigation/navigation.slice";
import { RouterPaths } from "../../router/router.paths";
import { LoadingButton } from "@mui/lab";
import { sessionSelectors } from "../../redux/session/session.selectors";
import { getPalette } from "../../theme/theme.palette";

export const LoginComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isLoginLoading = useSelector(sessionSelectors.loginLoading);

  const { handleSubmit, control, formState } = useForm<LoginValues>({
    defaultValues: defaultLoginValues,
    mode: "onChange",
  });

  const logInButtonClick = async (values: LoginValues) => {
    dispatch(
      sessionActions.login({
        email: values.email,
        password: values.password,
      })
    );
  };

  const signUpRedirectButtonClick = () => {
    dispatch(navigationActions.navigate(RouterPaths.SignUp));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        top: "20vh",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <Typography
        style={{
          marginBottom: "50px",
        }}
        variant="h2"
      >
        Log In
      </Typography>

      <form onSubmit={handleSubmit(logInButtonClick)}>
        <ControlledInput
          style={{
            marginBottom: "10px",
            width: "384px",
            height: "54px",
          }}
          name={"email"}
          title="Email Adress"
          control={control}
          type="email"
        />
        <ControlledInput
          style={{
            marginBottom: "10px",
            width: "384px",
            height: "54px",
          }}
          name={"password"}
          title="Password"
          control={control}
          type="password"
        />
        {!isLoginLoading ? (
          <Button
            style={{
              marginTop: "40px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "203px",
              height: "55px",
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
            }}
            type="submit"
          >
            <Typography variant="h4">Log In</Typography>
          </Button>
        ) : (
          <LoadingButton
            sx={{
              marginTop: "40px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "203px",
              height: "55px",
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
            }}
            type="submit"
            loading
            disabled
            variant="outlined"
            size="large"
          />
        )}
      </form>

      <Button
        style={{
          marginTop: "17px",
        }}
        variant="text"
        onClick={signUpRedirectButtonClick}
      >
        <Typography variant="h6">Don't have an account?</Typography>
      </Button>
    </Box>
  );
};