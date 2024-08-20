"use client";

import { CharacterSearch } from "@/components/character-search/character-search";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

export const FavoriteCharacters = () => {
  const {
    favCharacters,
    handleSaveFavCharacter,
    filteredCharacters,
    isLoading
  } = useFavoriteCharacters();

  return (
    <CharacterSearch
      title="FAVORITES"
      isLoading={isLoading}
      favCharacters={favCharacters}
      filteredCharacters={filteredCharacters ?? favCharacters}
      results={filteredCharacters?.length ?? favCharacters?.length}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
