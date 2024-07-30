"use client";

import { CharacterSearchPage } from "@/components/character-search-page";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

export const FavoriteCharacters = () => {
  const {
    favCharacters,
    filteredFavCharacters,
    handleSaveFavCharacter,
    searchValue,
    setSearchValue
  } = useFavoriteCharacters();

  return (
    <CharacterSearchPage
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
      title="FAVORITES"
      results={filteredFavCharacters?.length ?? 0}
      favCharacters={favCharacters}
      filteredCharacters={filteredFavCharacters}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
