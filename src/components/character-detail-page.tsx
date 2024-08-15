import { Character } from "@/types";
import Image from "next/image";
import type { JSX } from "react";
import styles from "./character-detail-page.module.css";
import { CustomButtonFav } from "./custom-button-fav";
import { CustomLoader } from "./custom-loader";

interface CharacterDetailPageProps {
  data: Character;
  favCharacters: Character[] | null;
  isLoading?: boolean;
  onClickFav?: (character: Character) => void;
}

/**
 * Renders the character detail page.
 *
 * @param {CharacterDetailPageProps} props - The component props.
 * @param {Character} props.data - The character data.
 * @param {Character[]} props.favCharacters - The favorite characters list.
 * @param {boolean} props.isLoading - Indicates if the data is loading.
 * @param {Function} props.onClickFav - The function to handle favorite button click.
 * @returns {JSX.Element} The character detail page component.
 */
export const CharacterDetailPage = ({
  data,
  favCharacters,
  isLoading,
  onClickFav
}: CharacterDetailPageProps): JSX.Element => {
  const isFav = !!favCharacters?.find((item) => item?.id === data?.id);
  const image = data
    ? `${data?.thumbnail.path}.${data?.thumbnail.extension}`
    : "";

  return (
    <div className={styles.container}>
      {isLoading ? (
        <CustomLoader color="light" />
      ) : (
        <div className={styles.frame}>
          <Image
            src={image}
            className={styles.image}
            alt="character-detail-page"
            width={500}
            height={500}
          />
          <div className={styles.containerDetails}>
            <div className={styles.details}>
              <div className={styles.containerName}>
                <h1 className={styles.name}>{data?.name.toUpperCase()}</h1>
                <CustomButtonFav
                  isActive={isFav}
                  onClick={() => onClickFav && onClickFav(data)}
                />
              </div>
              <h3 className={styles.description}>
                {data?.description || "Without description"}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
