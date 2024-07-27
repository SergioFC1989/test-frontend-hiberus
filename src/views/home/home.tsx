"use client";

import { CustomTextInputSearch } from "@/components/custom-text-input-search/custom-text-input-search";
import { useState } from "react";
import styles from "./home.module.css";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.container}>
      <CustomTextInputSearch
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
