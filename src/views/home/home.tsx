"use client";

import { CustomCardCharacter } from "@/components/custom-card-character/custom-card-character";
import { CustomLoader } from "@/components/custom-loader/custom-loader";
import { CustomTextInputSearch } from "@/components/custom-text-input-search/custom-text-input-search";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import { useHome } from "@/hooks/useHome";
import styles from "./home.module.css";

export const Home = () => {
  const { searchValue, setSearchValue, filteredValue, isLoading } = useHome();
  const { handleSaveCharacterFav, charactersFav } = useFavoriteCharacters();

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <CustomTextInputSearch
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
        />
        <p>{filteredValue?.length ?? 0} RESULTS</p>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className={styles.characters}>
          {filteredValue && filteredValue.length ? (
            filteredValue.map((character) => {
              const isFav = !!charactersFav?.find(
                (item) => item.id === character.id
              );

              return (
                <CustomCardCharacter
                  key={character.id}
                  data={character}
                  isActive={isFav}
                  onClick={() => handleSaveCharacterFav(character)}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
