"use client";

import { CharacterSearch } from "@/components/character-search/character-search";
import { useCharacters } from "@/hooks/useCharacters";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

export const Characters = () => {
  const { characters, filteredCharacters, isLoading } = useCharacters();
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <CharacterSearch
      isLoading={isLoading}
      favCharacters={favCharacters}
      filteredCharacters={filteredCharacters ?? characters}
      results={filteredCharacters?.length ?? characters?.length}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
