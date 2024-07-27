"use client";

import Image from "next/image";
import { CustomButtonFav } from "../custom-button-fav/custom-button-fav";
import styles from "./custom-marvel-header.module.css";

interface CustomMarvelHeaderProps {
  children: React.ReactNode;
  totalFav?: number;
}

export const CustomMarvelHeader = ({
  children,
  totalFav = 0
}: CustomMarvelHeaderProps) => {
  return (
    <main>
      <header className={styles.containerHeader}>
        <Image
          className={styles.logo}
          src="/image/header-logo-marvel.svg"
          alt="header-logo-marvel-svg"
          height={44}
          width={122}
        />
        <div className={styles.containerFav}>
          <CustomButtonFav isActive width={24} height={22} />
          <h3 className={styles.totalFav}>{totalFav}</h3>
        </div>
      </header>
      <section>{children}</section>
    </main>
  );
};
