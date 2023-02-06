import { createSelector } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'
import { CreatedSelectors, StoreState } from '../store.types'
import { currentActionTexts } from "./session.slice";

const sessionSlice: CreatedSelectors[StoreKeys.Session] = (state: StoreState) =>
  state[StoreKeys.Session];

const currentCategory = createSelector(
  sessionSlice,
  (reducerState) => reducerState.currentCategory
);

const currentNote = createSelector(
  sessionSlice,
  (reducerState) => reducerState.currentNote
);

const currentAction = createSelector(sessionSlice, (reducerState) => {
  const actions = reducerState.currentAction;
  const currentActions = [];

  Object.keys(actions).forEach((actionName) => {
    if (actions[actionName] === true) {
      currentActions.push(currentActionTexts[actionName]);
    }
  });
  return currentActions.join(" & ");
});

const actionStatus = (actionName: string) =>
  createSelector(sessionSlice, (reducerState) => {
    return reducerState.currentAction[actionName];
  });

const loginLoading = createSelector(
  sessionSlice,
  (reducerState) => reducerState.loading.login
);

const foldersAndNotesLoading = createSelector(
  sessionSlice,
  (reducerState) => reducerState.loading.foldersAndNotes
);

const authToken = createSelector(
  sessionSlice,
  (reducerState) => reducerState.authToken
);

const loginInfo = createSelector(
  sessionSlice,
  (reducerState) => reducerState.loginInfo
);
const username = createSelector(
	sessionSlice,
	(reducerState) => reducerState.username
  );

export const sessionSelectors = {
  currentCategory,
  currentNote,
  currentAction,
  loginLoading,
  foldersAndNotesLoading,
  authToken,
  loginInfo,
  actionStatus,
  username,
};
