import { Character } from "@/types";
import Image from "next/image";
import { CustomButtonFav } from "../custom-button-fav/custom-button-fav";
import styles from "./custom-card-character.module.css";

interface CustomCardCharacterProps {
  data: Character;
}

export const CustomCardCharacter = ({ data }: CustomCardCharacterProps) => {
  const image = `${data.thumbnail.path}.${data.thumbnail.extension}`;

  return (
    <div className={styles.container}>
      <section className={styles.image}>
        <Image src={image} alt={data.name} width={175} height={175} />
      </section>
      <section className={styles.divider} />
      <footer className={styles.footer}>
        <div className={styles.elementsFooter}>
          <h4 className={styles.footerName}>{data.name.toUpperCase()}</h4>
          <CustomButtonFav isActive={false} width={12} height={12} />
        </div>
        <div className={styles.corner}></div>
      </footer>
    </div>
  );
};
