"use client";

import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import Image from "next/image";
import Link from "next/link";
import { CustomButtonFav } from "./custom-button-fav";
import styles from "./layout-page.module.css";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const LayoutPage = ({ children }: CustomLayoutProps) => {
  const { favCharacters } = useFavoriteCharacters();
  return (
    <main>
      <header className={styles.containerHeader}>
        <Link className={styles.link} href="/">
          <Image
            className={styles.logo}
            src="/image/logo-marvel.svg"
            alt="logo-marvel-svg"
            height={44}
            width={122}
          />
        </Link>
        <div className={styles.containerFav}>
          <Link className={styles.link} href="/favorite-characters">
            <CustomButtonFav isActive width={24} height={22} />
          </Link>
          <h3 className={styles.totalFav}>{favCharacters?.length || 0}</h3>
        </div>
      </header>
      <section className={styles.containerChildren}>{children}</section>
    </main>
  );
};
