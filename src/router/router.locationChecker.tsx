import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import { RouterPaths } from "./router.paths";
import { sessionSelectors } from "../redux/session/session.selectors";
import { sessionActions } from "../redux/session/session.slice";
import { navigationActions } from "../redux/navigation/navigation.slice";

export const LocationChecker = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLogged = useSelector(sessionSelectors.loginInfo);
  const authToken = useSelector(sessionSelectors.authToken);
  const isNotesPage = location.pathname.includes(RouterPaths.Notes);

  useEffect(() => {
    //logguot when loginInfo or authToken is false and navigate to login page
    if ((!isLogged || !Boolean(authToken)) && isNotesPage) {
      dispatch(navigationActions.navigate(RouterPaths.Login));
      dispatch(sessionActions.logout({}));
    }
  }, [isLogged, authToken, isNotesPage]);

  return <Outlet />;
};
