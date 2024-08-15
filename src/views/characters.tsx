"use client";

import { CharacterSearchPage } from "@/components/character-search-page";
import { useCharacters } from "@/hooks/useCharacters";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

export const Characters = () => {
  const { characters, filteredCharacters, isLoading } = useCharacters();
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <CharacterSearchPage
      isLoading={isLoading}
      favCharacters={favCharacters}
      filteredCharacters={filteredCharacters ?? characters}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
