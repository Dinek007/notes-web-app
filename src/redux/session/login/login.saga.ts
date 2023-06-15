import { call, put, select } from 'typed-redux-saga';
import { RouterPaths } from '../../../router/router.paths';
import { LoginReqDTO, LoginResDTO, UserService } from '../../../swagger/api';
import { setToken } from '../../../swagger/swagger.config';
import { navigationActions } from '../../navigation/navigation.slice';
import { getCategories } from "../../notes/getCategoriesAndNotes/getCategoriesAndNotes.saga";
import { sessionSelectors } from "../session.selectors";
import {
  currentActionNames,
  currentCategoryNames,
  SessionActions,
  sessionActions,
} from "../session.slice";

export function* loginSaga(action: SessionActions["login"]) {
  yield* put(sessionActions.logout({}));

  yield* put(sessionActions.setLoginLoading(true));
  yield* put(sessionActions.setFoldersAndNotesLoading(true));
  yield* put(
    sessionActions.setCurrentAction(currentActionNames.loadingFoldersAndNotes)
  );

  let responseLogin: LoginResDTO;

  try {
    responseLogin =
      yield * call(UserService.userControllerLogin, action.payload);
  } catch (error) {
    yield * put(sessionActions.setLoginLoading(false));
    yield * put(sessionActions.setFoldersAndNotesLoading(false));
    yield *
      put(
        sessionActions.removeCurrentAction(
          currentActionNames.loadingFoldersAndNotes
        )
      );
    yield * put(sessionActions.setLoginError(error.body.message));
    console.error(error);
    return;
  }
  yield * put(sessionActions.setUsername(responseLogin.user.name));

  yield * put(sessionActions.setLoginInfo(true));
  yield * put(navigationActions.navigate(RouterPaths.Notes));

  yield * put(sessionActions.setAuthToken(responseLogin.accessToken));
  yield * call(setToken, responseLogin.accessToken);

  yield * call(getCategories);
  yield *
    put(
      sessionActions.setCurrentCategory({
        id: "",
        name: currentCategoryNames.home,
      })
    );
  yield * put(sessionActions.setLoginLoading(false));
  yield * put(sessionActions.setFoldersAndNotesLoading(false));
  yield *
    put(
      sessionActions.removeCurrentAction(
        currentActionNames.loadingFoldersAndNotes
      )
    );
  yield * put(sessionActions.setLoginError(""));

}   