"use client";

import Image from "next/image";
import { CustomButtonFav } from "../custom-button-fav/custom-button-fav";
import styles from "./custom-layout.module.css";

interface CustomLayoutProps {
  children: React.ReactNode;
  totalFav?: number;
}

export const CustomLayout = ({ children, totalFav = 0 }: CustomLayoutProps) => {
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
          <CustomButtonFav isActive disabled width={24} height={22} />
          <h3 className={styles.totalFav}>{totalFav}</h3>
        </div>
      </header>
      <section className={styles.containerChildren}>{children}</section>
    </main>
  );
};
