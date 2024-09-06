import { ButtonFavorite } from "@/components/button-favorite/button-favorite";
import { Loader } from "@/components/loader/loader";
import { Character } from "@/types";
import Image from "next/image";
import type { JSX } from "react";
import styles from "./character-detail.module.css";

interface CharacterDetailProps {
  data: Character | null;
  favCharacters: Character[] | null;
  onClickFav?: (character: Character) => void;
}

/**
 * Renders the character detail page.
 *
 * @param {CharacterDetailProps} props - The component props.
 * @param {Character} props.data - The character data.
 * @param {Character[]} props.favCharacters - The favorite characters list.
 * @param {boolean} props.isLoading - Indicates if the data is loading.
 * @param {Function} props.onClickFav - The function to handle favorite button click.
 * @returns {JSX.Element} The character detail page component.
 */
export const CharacterDetail = ({
  data,
  favCharacters,
  onClickFav
}: CharacterDetailProps): JSX.Element => {
  console.log(data);
  const isFav = !!favCharacters?.find((item) => item?.id === data?.id);
  const image = data
    ? `${data?.thumbnail.path}.${data?.thumbnail.extension}`
    : "";

  return (
    <div className={styles.container}>
      {!data ? (
        <div className={styles.loader}>
          <Loader color="light" />
        </div>
      ) : (
        <div className={styles.frame}>
          <Image
            src={image ?? ""}
            className={styles.image}
            alt="character-detail-page"
            width={500}
            height={500}
          />
          <div className={styles.containerDetails}>
            <div className={styles.details}>
              <div className={styles.containerName}>
                <h1 className={styles.name}>{data?.name.toUpperCase()}</h1>
                <ButtonFavorite
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
