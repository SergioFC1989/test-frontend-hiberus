import { Character } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CustomButtonFav } from "./custom-button-fav";
import styles from "./custom-card-character.module.css";

interface CustomCardCharacterProps {
  data: Character;
  isActive: boolean;
  onClick?: () => void;
}

export const CustomCardCharacter = ({
  data,
  isActive,
  onClick
}: CustomCardCharacterProps) => {
  const image = `${data.thumbnail.path}.${data.thumbnail.extension}`;

  return (
    <div className={styles.container}>
      <section className={styles.image}>
        <Link href={`/detail-character/${data.id}`}>
          <Image src={image} alt={data.name} width={175} height={175} />
        </Link>
      </section>
      <section className={styles.divider} />
      <footer className={styles.footer}>
        <div className={styles.elementsFooter}>
          <h4 className={styles.footerName}>{data.name.toUpperCase()}</h4>
          <CustomButtonFav
            isActive={isActive}
            width={16}
            height={16}
            onClick={onClick}
          />
        </div>
      </footer>
    </div>
  );
};
