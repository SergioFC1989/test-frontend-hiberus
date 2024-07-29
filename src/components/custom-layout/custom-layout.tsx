"use client";

import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import Image from "next/image";
import { CustomButtonFav } from "../custom-button-fav/custom-button-fav";
import styles from "./custom-layout.module.css";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const { charactersFav } = useFavoriteCharacters();
  return (
    <main>
      <header className={styles.containerHeader}>
        <Image
          className={styles.logo}
          src="/image/logo-marvel.svg"
          alt="logo-marvel-svg"
          height={44}
          width={122}
        />
        <div className={styles.containerFav}>
          <CustomButtonFav isActive width={24} height={22} />
          <h3 className={styles.totalFav}>{charactersFav?.length || 0}</h3>
        </div>
      </header>
      <section className={styles.containerChildren}>{children}</section>
    </main>
  );
};
