import { useAppConfig } from "@/contexts/app-config-context";
import { CHARACTER_LOCALSTORAGE_KEY } from "@/lib/constants";
import { Character } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCache } from "./useCache";

/**
 * Custom hook for managing favorite characters.
 * @returns An object containing the favorite characters and a function to handle saving favorite characters.
 */
export const useFavoriteCharacters = () => {
  const { favCharacters, setFavCharacters, searchValue, setSearchValue } =
    useAppConfig();
  const { cache, handleSaveCache } = useCache(CHARACTER_LOCALSTORAGE_KEY);

  const [filteredFavCharacters, setFilteredFavCharacters] =
    useState(favCharacters);

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

  const handleFilterFavCharacters = useCallback(() => {
    if (searchValue) {
      const filteredCharacters = favCharacters?.filter((item) =>
        item.name.toUpperCase().includes(searchValue.toUpperCase())
      );
      setFilteredFavCharacters(filteredCharacters || null);
    } else {
      setFilteredFavCharacters(favCharacters);
    }
  }, [favCharacters, searchValue]);

  useEffect(() => {
    if (_cache !== null && _cache.length > 0) {
      setFavCharacters(_cache);
    }
  }, [_cache, setFavCharacters]);

  useEffect(() => {
    handleFilterFavCharacters();
  }, [handleFilterFavCharacters]);

  const values = useMemo(
    () => ({
      favCharacters,
      handleSaveFavCharacter,
      searchValue,
      setSearchValue,
      filteredFavCharacters
    }),
    [
      favCharacters,
      filteredFavCharacters,
      handleSaveFavCharacter,
      searchValue,
      setSearchValue
    ]
  );

  return values;
};
