import { TextInputSearch } from "@/components/text-input-search/text-input-search";
import { useCharacterInputSearch } from "@/hooks/useCharacterInputSearch";
import styles from "./character-input-search.module.css";

export const CharacterInputSearch = ({ results }: { results: number }) => {
  const { isLoading, searchValue, setSearchValue, handleFilterCharacters } =
    useCharacterInputSearch();

  return (
    <div className={styles.search}>
      <TextInputSearch
        value={searchValue.toUpperCase()}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleFilterCharacters}
      />
      {!isLoading ? <p>{results} RESULTS</p> : <div />}
    </div>
  );
};
