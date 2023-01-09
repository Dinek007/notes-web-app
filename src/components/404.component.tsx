import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { getPalette } from "../theme/theme.palette";
import { PopupComponent } from "./popup.component";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { navigationActions } from "../redux/navigation/navigation.slice";
import { RouterPaths } from "../router/router.paths";
import { sessionSelectors } from "../redux/session/session.selectors";
import { sessionActions } from "../redux/session/session.slice";

export const WrongComponent = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLogged = useSelector(sessionSelectors.loginInfo);
  const isAuthToken = useSelector(sessionSelectors.authToken);

  const handleConfirm = () => {
    if (isLogged && Boolean(isAuthToken)) {
      dispatch(navigationActions.navigate(RouterPaths.Notes));
    } else {
      dispatch(navigationActions.navigate(RouterPaths.Login));
    }

    dispatch(sessionActions.refreshPage({}));
  };

  return (
    <PopupComponent
      title={"404 Error"}
      handleClosePopup={() => handleConfirm()}
      children={
        <>
          <Box
            sx={{
              width: "300px",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">This page does not exist </Typography>
          </Box>
          <Box>
            <LoadingButton
              style={{
                marginTop: "60px",
                left: "50%",
                transform: "translate(-50%, 0)",
                width: "203px",
                height: "55px",
                backgroundColor: theme.palette.primary.dark,
                boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
              }}
              type="submit"
              variant="text"
              onClick={() => handleConfirm()}
              loading={false}
            >
              <Typography variant="h4">Go back</Typography>
            </LoadingButton>
          </Box>
        </>
      }
    ></PopupComponent>
  );
};
