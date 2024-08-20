import { ButtonFavorite } from "@/components/button-favorite/button-favorite";
import { Character } from "@/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./card-character.module.css";

interface CardCharacterProps {
  data: Character;
  isActive: boolean;
  onClick?: () => void;
  testId?: string;
}

export const CardCharacter = ({
  data,
  isActive,
  testId,
  onClick
}: CardCharacterProps) => {
  const image = `${data.thumbnail.path}.${data.thumbnail.extension}`;

  return (
    <div className={styles.container} data-testId={testId}>
      <section className={styles.image}>
        <Link href={`/detail-character/${data.id}`}>
          <Image src={image} alt={data.name} width={175} height={175} />
        </Link>
      </section>
      <section className={styles.divider} />
      <footer className={styles.footer}>
        <div className={styles.elementsFooter}>
          <h4 className={styles.footerName}>{data.name.toUpperCase()}</h4>
          <ButtonFavorite
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
