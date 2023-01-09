import { createSelector } from "@reduxjs/toolkit";
import { StoreKeys } from "../store.keys";
import { CreatedSelectors, StoreState } from "../store.types";

const navigationSlice: CreatedSelectors[StoreKeys.Navigation] = (
  state: StoreState
) => state[StoreKeys.Navigation];

const location = createSelector(
  navigationSlice,
  (reducerState) => reducerState.location
);

export const navigationSelectors = {
  location,
};
