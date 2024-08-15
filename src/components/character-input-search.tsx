import { useAppConfig } from "@/contexts/app-config-context";
import styles from "./character-input-search.module.css";
import { CustomTextInputSearch } from "./custom-text-input-search";

export const CharacterInputSearch = () => {
  const { setIsLoading, searchValue, setSearchValue } = useAppConfig();

  const handleFilterCharacters = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (searchValue.length && e.key === "Enter") {
      try {
        setIsLoading(true);
        // const response = await getFilteredCharacters(searchValue);
        // console.log(response);
      } catch (error) {
        console.error("Error to get filtered characters");
      }
    } else {
      // aqui el seteo de los personajes originales
    }
  };

  return (
    <div className={styles.search}>
      <CustomTextInputSearch
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleFilterCharacters}
      />
      <p>{} RESULTS</p>
    </div>
  );
};
