import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";

import { SignUpValues } from "./signUp.fields";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ControlledInput } from "../../components/TextInput/TextInput.controlled";
import { defaultSignUpValues } from "./signUp.fields";
import { sessionActions } from "../../redux/session/session.slice";
import { RouterPaths } from "../../router/router.paths";
import { navigationActions } from "../../redux/navigation/navigation.slice";
import { LoadingButton } from "@mui/lab";
import { sessionSelectors } from "../../redux/session/session.selectors";

export const SignUpComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { handleSubmit, control, formState } = useForm<SignUpValues>({
    defaultValues: defaultSignUpValues,
    mode: "onChange",
  });

  const isLoginLoading = useSelector(sessionSelectors.loginLoading);

  const signUpButtonClick = async (values: SignUpValues) => {
    dispatch(
      sessionActions.signUp({
        email: values.email,
        password: values.password,
        name: values.userName,
      })
    );
  };

  const logInRedirectButtonClick = () => {
    dispatch(navigationActions.navigate(RouterPaths.Login));
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
        Create an account
      </Typography>

      <form onSubmit={handleSubmit(signUpButtonClick)}>
        <ControlledInput
          style={{
            marginBottom: "10px",
            width: "384px",
            height: "54px",
          }}
          name={"userName"}
          title="Username"
          control={control}
          type="text"
        />
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
              width: "305px",
              height: "83px",
            }}
            type="submit"
          >
            <Typography variant="h4">Sign Up</Typography>
          </Button>
        ) : (
          <LoadingButton
            sx={{
              marginTop: "40px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "305px",
              height: "83px",
              backgroundColor: theme.palette.primary.main,
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
        onClick={logInRedirectButtonClick}
      >
        <Typography variant="h6">Already have an account?</Typography>
      </Button>
    </Box>
  );
};