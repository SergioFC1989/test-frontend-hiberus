"use client";

import { CharacterSearchPage } from "@/components/character-search-page";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import { useHome } from "@/hooks/useHome";

export const Home = () => {
  const { searchValue, setSearchValue, filteredCharacters, isLoading } =
    useHome();
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <CharacterSearchPage
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
      results={filteredCharacters?.length ?? 0}
      isLoading={isLoading}
      favCharacters={favCharacters}
      filteredCharacters={filteredCharacters}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
