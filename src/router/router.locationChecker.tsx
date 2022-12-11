// import { useEffect } from "react";
// import { Outlet, useLocation } from "react-router";
// import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom"

// import { authActions } from "../store/auth/auth.slice";
// import { userActions } from "../store/user/user.slice";
// import { accessTokenSelector } from "../store/auth/auth.selectors";
// import { userProfileSelector } from "../store/user/user.selectors";
// import { RouterPaths } from "./router.paths";

// export const LocationChecker = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const searchParams = new URLSearchParams(location.search);
//   const accessToken = useSelector(accessTokenSelector);
//   const userProfile = useSelector(userProfileSelector);
//   const emailAccess = searchParams.get("emailAccess");
//   const isLoginPage = location.pathname.includes("login");

//   useEffect(() => {
//     const isRegisteredAgentPage =
//       location.pathname === RouterPaths.RegisterAgent;

//     if (isRegisteredAgentPage) {
//       dispatch(authActions.signOut({ shouldRedirectToLoginPage: false }));
//       return;
//     }

//     if (!isLoginPage && (!accessToken || emailAccess)) {
//       dispatch(authActions.signOut({ shouldRedirectToLoginPage: true }));
//       return;
//     }

//     if (!userProfile && !!accessToken && !isRegisteredAgentPage) {
//       dispatch(userActions.fetchUserProfileRequest());
//     }
//   }, [accessToken, dispatch, userProfile, location, emailAccess, isLoginPage]);

//   return <Outlet />;
// };

export const LocationChecker = () => {
  return <Outlet />
}

 
