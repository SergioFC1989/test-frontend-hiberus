import { appConfigActions } from "../actions/app-config-actions";
import { AppConfigActionsProps, AppConfigStateProps } from "../types";

export const appConfigReducer = (
  state: AppConfigStateProps,
  action: AppConfigActionsProps
): AppConfigStateProps => {
  switch (action.type) {
    case appConfigActions.SET_CHARACTERS:
      return { ...state, characters: action.payload };

    case appConfigActions.SET_FILTERED_CHARACTERS:
      return { ...state, filteredCharacters: action.payload };

    case appConfigActions.SET_DETAIL_CHARACTER:
      return { ...state, detailCharacter: action.payload };

    case appConfigActions.SET_COMICS:
      return { ...state, comics: action.payload };

    case appConfigActions.SET_FAV_CHARACTERS:
      return { ...state, favCharacters: action.payload };

    case appConfigActions.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case appConfigActions.SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };

    default:
      return state;
  }
};
