import { useCharacterInputSearch } from "@/hooks/useCharacterInputSearch";
import styles from "./character-input-search.module.css";
import { CustomTextInputSearch } from "./custom-text-input-search";

export const CharacterInputSearch = () => {
  const {
    isLoading,
    searchValue,
    setSearchValue,
    handleFilterCharacters,
    results
  } = useCharacterInputSearch();

  return (
    <div className={styles.search}>
      <CustomTextInputSearch
        value={searchValue.toUpperCase()}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleFilterCharacters}
      />
      {!isLoading ? <p>{results} RESULTS</p> : <div />}
    </div>
  );
};
