"use client";

import { CharacterSearchPage } from "@/components/character-search-page";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

export const FavoriteCharacters = () => {
  const {
    favCharacters,
    handleSaveFavCharacter,
    filteredCharacters,
    isLoading
  } = useFavoriteCharacters();

  return (
    <CharacterSearchPage
      title="FAVORITES"
      isLoading={isLoading}
      favCharacters={favCharacters}
      filteredCharacters={filteredCharacters ?? favCharacters}
      results={filteredCharacters?.length ?? favCharacters?.length}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
