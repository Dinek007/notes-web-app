import { RouteObject } from "react-router";
import { RouterPaths } from "./router.paths";
import { LocationChecker } from "./router.locationChecker";
import { LoginComponent } from "../pages/login/login.component";
import { SignUpComponent } from "../pages/signUp/signUp.component";
import { MainComponent } from "../pages/main/main.component";
import { NotesComponent } from "../pages/board/main.component";
import { PopupComponent } from "../components/popup.component";
import { WrongComponent } from "../components/404.component";

export const routes: RouteObject[] = [
  {
    element: <LocationChecker />,
    path: "/",
    children: [
      // {
      //   element: <WrongPage />,
      //   path: "*",
      // },
      {
        element: <LoginComponent />,
        path: RouterPaths.Login,
      },
      {
        element: <SignUpComponent />,
        path: RouterPaths.SignUp,
      },
      {
        element: <NotesComponent />,
        path: RouterPaths.Notes,
      },
      {
        element: <MainComponent />,
        index: true,
      },
      {
        element: <WrongComponent />,
        path: "*",
      },
    ],
  },
];
