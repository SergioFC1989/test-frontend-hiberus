"use client";

import { CustomCardCharacter } from "@/components/custom-card-character/custom-card-character";
import { CustomTextInputSearch } from "@/components/custom-text-input-search/custom-text-input-search";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import { useHome } from "@/hooks/useHome";
import styles from "./home.module.css";

export const Home = () => {
  const { searchValue, setSearchValue, filteredValue, isLoading } = useHome();
  const { handleSaveCharacterFav, isFavorite } = useFavoriteCharacters();

  const validatedFilteredValue = filteredValue && filteredValue.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <CustomTextInputSearch
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
        />
        <p>{filteredValue?.length} RESULTS</p>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.characters}>
          {validatedFilteredValue &&
            filteredValue.map((character) => (
              <CustomCardCharacter
                key={character.id}
                data={character}
                isActive={isFavorite}
                onClick={() => handleSaveCharacterFav(character)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
