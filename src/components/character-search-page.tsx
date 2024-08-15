import { CustomCardCharacter } from "@/components/custom-card-character";
import { CustomLoader } from "@/components/custom-loader";
import { Character } from "@/types";
import { CharacterInputSearch } from "./character-input-search";
import styles from "./character-search-page.module.css";

interface CharacterSearchPageProps {
  title?: string;
  isLoading?: boolean;
  favCharacters: Character[] | null;
  filteredCharacters?: Character[] | null;
  onClickFav?: (character: Character) => void;
}

export const CharacterSearchPage = ({
  title = "",
  isLoading,
  favCharacters,
  filteredCharacters,
  onClickFav
}: CharacterSearchPageProps) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <CharacterInputSearch />
      {isLoading ? (
        <CustomLoader color="dark" />
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
