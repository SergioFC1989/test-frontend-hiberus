import { CHARACTER_LOCALSTORAGE_KEY } from "@/api/constants";
import { useAppConfig } from "@/contexts/app-config-context";
import { Character } from "@/types";
import { useCallback, useEffect, useMemo } from "react";
import { useCache } from "./useCache";

export const useFavoriteCharacters = () => {
  const { cache, handleSaveCache } = useCache(CHARACTER_LOCALSTORAGE_KEY);
  const { charactersFav, setCharactersFav } = useAppConfig();
  const _cache = cache as Character[];

  const handleSaveCharacterFav = useCallback(
    (character: Character) => {
      if (!(_cache !== null && _cache.length > 0)) {
        setCharactersFav([character]);
        handleSaveCache([character]);
        return;
      }

      const foundCharacterFav = _cache.find(
        (item: Character) => item.id === character.id
      );

      if (!foundCharacterFav) {
        setCharactersFav([..._cache, character]);
        handleSaveCache([..._cache, character]);
      } else {
        const removeCharacterFav = _cache?.filter(
          (item: Character) => item.id !== character.id
        );
        setCharactersFav(removeCharacterFav);
        handleSaveCache(removeCharacterFav);
      }
    },
    [_cache, handleSaveCache, setCharactersFav]
  );

  useEffect(() => {
    if (_cache !== null && _cache.length > 0) {
      setCharactersFav(_cache);
    }
  }, [_cache, setCharactersFav]);

  const values = useMemo(
    () => ({ charactersFav, handleSaveCharacterFav }),
    [charactersFav, handleSaveCharacterFav]
  );

  return values;
};
