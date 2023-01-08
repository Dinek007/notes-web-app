import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { navigationActions } from '../../redux/navigation/navigation.slice'
import { RouterPaths } from '../../router/router.paths'
import homePageImage from "../../assets/mainPageIcon.png";
import { height } from "@mui/system";

export const MainComponent = () => {
  const dispatch = useDispatch();
  const [navigatePath, setNavigatePath] = useState<RouterPaths>();

  const useLogInButtonClick = () => {
    setNavigatePath(RouterPaths.Login);
  };

  const useSignUpButtonClick = () => {
    setNavigatePath(RouterPaths.SignUp);
  };

  useEffect(() => {
    dispatch(navigationActions.navigate(navigatePath));
  }, [navigatePath]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          height: "10vh",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Box sx={{ position: "absolute", left: "70px" }}>
          <Typography variant="h1">World of Notes</Typography>
        </Box>

        <Box sx={{ position: "absolute", right: "40px" }}>
          <Button
            sx={{ marginRight: "20px" }}
            variant="text"
            onClick={useLogInButtonClick}
          >
            <Typography variant="h3">Log In</Typography>
          </Button>
          <Button
            sx={{ marginRight: "20px" }}
            variant="text"
            onClick={useSignUpButtonClick}
          >
            <Typography variant="h3">Sign Up</Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: "90vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "90vh",
            width: "50vw",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <img
            src={homePageImage}
            style={{
              position: "relative",
              top: "2vh",
              left: "2vw",
              width: "40vw",
              height: "40vw",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "90vh",
            width: "50vw",
            flexDirection: "column",
            alignItems: "baseline",
            alignContent: "flex-start",
            justifyContent: "center",
            flexWrap: "nowrap",
            marginBottom: "16vh",
          }}
        >
          <Box>
            <Typography variant="h2">
              Have all your notes always at hand.
            </Typography>

            <Typography
              sx={{
                marginTop: "30px",
                marginBottom: "50px",
              }}
              variant="h3"
            >
              Notes manager that you always needed.
            </Typography>
          </Box>

          <Button
            sx={{
              padding: "15px",
              paddingRight: "40px",
              paddingLeft: "40px",
            }}
            onClick={useSignUpButtonClick}
          >
            <Typography variant="h3"> Get Started </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};