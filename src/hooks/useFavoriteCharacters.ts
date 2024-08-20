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
  const {
    favCharacters,
    setFavCharacters,
    filteredCharacters,
    setFilteredCharacters,
    searchValue,
    isLoading
  } = useAppConfig();
  const { cache, handleSaveCache } = useCache(CHARACTER_LOCALSTORAGE_KEY);

  const _cache = cache as Character[];

  const handleSaveFavCharacter = useCallback(
    (character: Character) => {
      if (!(_cache !== null && _cache.length > 0)) {
        setFavCharacters([character]);
        handleSaveCache([character]);
        return;
      }

      const foundFavCharacter = _cache.find(
        (item: Character) => item.id === character.id
      );

      if (!foundFavCharacter) {
        setFavCharacters([..._cache, character]);
        handleSaveCache([..._cache, character]);
      } else {
        const removeCharacterFav = _cache?.filter(
          (item: Character) => item.id !== character.id
        );
        setFavCharacters(removeCharacterFav);
        handleSaveCache(removeCharacterFav);
      }
    },
    [_cache, handleSaveCache, setFavCharacters]
  );

  useEffect(() => {
    if (!searchValue.length) {
      setFilteredCharacters(null);
    }
  }, [favCharacters, searchValue.length, setFilteredCharacters]);

  useEffect(() => {
    if (_cache !== null && _cache.length > 0) {
      setFavCharacters(_cache);
    }
  }, [_cache, setFavCharacters]);

  return {
    favCharacters,
    handleSaveFavCharacter,
    filteredCharacters: filteredCharacters?.data.results,
    isLoading
  };
};
