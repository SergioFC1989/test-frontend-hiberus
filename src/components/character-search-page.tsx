import { CustomCardCharacter } from "@/components/custom-card-character";
import { CustomLoader } from "@/components/custom-loader";
import { CustomTextInputSearch } from "@/components/custom-text-input-search";
import { Character } from "@/types";
import styles from "./character-search-page.module.css";

interface CharacterSearchPageProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  results: number;
  isLoading?: boolean;
  favCharacters: Character[] | null;
  filteredCharacters?: Character[] | null;
  onClickFav?: (character: Character) => void;
}

export const CharacterSearchPage = ({
  value,
  onChange,
  title = "",
  results,
  isLoading,
  favCharacters,
  filteredCharacters,
  onClickFav
}: CharacterSearchPageProps) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.search}>
        <CustomTextInputSearch value={value} onChange={onChange} />
        <p>{results} RESULTS</p>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className={styles.characters}>
          {filteredCharacters && filteredCharacters.length ? (
            filteredCharacters.map((character) => {
              const isFav = !!favCharacters?.find(
                (item) => item.id === character.id
              );

              return (
                <CustomCardCharacter
                  key={character.id}
                  data={character}
                  isActive={isFav}
                  onClick={() => onClickFav && onClickFav(character)}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
