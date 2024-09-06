import {
  Character,
  CharactersProps,
  ComicPage,
  DetailCharacterProps
} from "@/types";
import { Dispatch } from "react";

export interface AppConfigStateProps {
  characters: CharactersProps | null;
  filteredCharacters: CharactersProps | null;
  detailCharacter: DetailCharacterProps | null;
  comics: ComicPage[] | [];
  favCharacters: Character[] | null;
  isLoading: boolean;
  searchValue: string;
}

export type AppConfigActions = {
  SET_CHARACTERS: "SET_CHARACTERS";
  SET_FILTERED_CHARACTERS: "SET_FILTERED_CHARACTERS";
  SET_DETAIL_CHARACTER: "SET_DETAIL_CHARACTER";
  SET_COMICS: "SET_COMICS";
  SET_FAV_CHARACTERS: "SET_FAV_CHARACTERS";
  SET_IS_LOADING: "SET_IS_LOADING";
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE";
};

export type AppConfigActionsProps =
  | {
      type: AppConfigActions["SET_CHARACTERS"];
      payload: CharactersProps | null;
    }
  | {
      type: AppConfigActions["SET_FILTERED_CHARACTERS"];
      payload: CharactersProps | null;
    }
  | {
      type: AppConfigActions["SET_DETAIL_CHARACTER"];
      payload: DetailCharacterProps | null;
    }
  | { type: AppConfigActions["SET_COMICS"]; payload: ComicPage[] }
  | {
      type: AppConfigActions["SET_FAV_CHARACTERS"];
      payload: Character[] | null;
    }
  | { type: AppConfigActions["SET_IS_LOADING"]; payload: boolean }
  | { type: AppConfigActions["SET_SEARCH_VALUE"]; payload: string };

export interface AppConfigContext {
  state: AppConfigStateProps;
  dispatch: Dispatch<AppConfigActionsProps>;
}

export type AppConfigContextProps = AppConfigContext | undefined;
