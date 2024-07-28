"use client";

import { CustomTextInputSearch } from "@/components/custom-text-input-search/custom-text-input-search";
import { useHome } from "@/hooks/useHome";
import styles from "./home.module.css";

export const Home = () => {
  const { characters, searchValue, setSearchValue, isLoading } = useHome();

  console.log(characters);

  return (
    <div className={styles.container}>
      <CustomTextInputSearch
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isLoading ? <h3>Loading</h3> : <h3>Termino de cargar los datos</h3>}
    </div>
  );
};
