"use client";

import { useAppConfig } from "@/contexts/app-config-context";
import { CHARACTER_LOCALSTORAGE_KEY } from "@/lib/constants";
import { Character } from "@/types";
import { useCallback, useEffect } from "react";
import { useCache } from "./useCache";

/**
 * Custom hook for managing favorite characters.
 * @returns An object containing the favorite characters and a function to handle saving favorite characters.
 */
export const useFavoriteCharacters = () => {
  const { state, dispatch } = useAppConfig();
  const { cache, handleSaveCache } = useCache(CHARACTER_LOCALSTORAGE_KEY);

  const _cache = cache as Character[];

  const handleSaveFavCharacter = useCallback(
    (character: Character) => {
      if (!(_cache !== null && _cache.length > 0)) {
        dispatch({ type: "SET_FAV_CHARACTERS", payload: [character] });
        handleSaveCache([character]);
        return;
      }

      const foundFavCharacter = _cache.find(
        (item: Character) => item.id === character.id
      );

      if (!foundFavCharacter) {
        dispatch({
          type: "SET_FAV_CHARACTERS",
          payload: [..._cache, character]
        });
        handleSaveCache([..._cache, character]);
      } else {
        const removeCharacterFav = _cache?.filter(
          (item: Character) => item.id !== character.id
        );
        dispatch({ type: "SET_FAV_CHARACTERS", payload: removeCharacterFav });
        handleSaveCache(removeCharacterFav);
      }
    },
    [_cache, dispatch, handleSaveCache]
  );

  useEffect(() => {
    if (!state.searchValue.length) {
      dispatch({ type: "SET_FILTERED_CHARACTERS", payload: state.characters });
    }
  }, [state.characters, state.searchValue, dispatch]);

  useEffect(() => {
    if (_cache !== null && _cache.length > 0) {
      dispatch({ type: "SET_FAV_CHARACTERS", payload: _cache });
    }
  }, [_cache, dispatch]);

  return {
    favCharacters: state.favCharacters,
    handleSaveFavCharacter,
    filteredCharacters: state.filteredCharacters?.data.results,
    isLoading: state.isLoading
  };
};
