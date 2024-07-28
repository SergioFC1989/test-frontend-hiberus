"use client";

import { CustomCardCharacter } from "@/components/custom-card-character/custom-card-character";
import { CustomTextInputSearch } from "@/components/custom-text-input-search/custom-text-input-search";
import { useHome } from "@/hooks/useHome";
import styles from "./home.module.css";

export const Home = () => {
  const { searchValue, setSearchValue, filteredValue, isLoading } = useHome();

  return (
    <div className={styles.container}>
      <CustomTextInputSearch
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
      />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.characters}>
          {filteredValue && filteredValue.length > 0 ? (
            filteredValue?.map((character) => (
              <CustomCardCharacter key={character.id} data={character} />
            ))
          ) : (
            <h3>No characters found</h3>
          )}
        </div>
      )}
    </div>
  );
};
