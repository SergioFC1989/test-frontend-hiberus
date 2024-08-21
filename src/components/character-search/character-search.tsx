import { CardCharacter } from "@/components/card-character/card-character";
import { CharacterInputSearch } from "@/components/character-input-search/character-input-search";
import { Loader } from "@/components/loader/loader";
import { Character } from "@/types";
import styles from "./character-search.module.css";

interface CharacterSearchProps {
  title?: string;
  isLoading?: boolean;
  favCharacters: Character[] | null;
  filteredCharacters?: Character[] | null;
  results?: number;
  onClickFav?: (character: Character) => void;
}

export const CharacterSearch = ({
  title = "",
  isLoading,
  favCharacters,
  filteredCharacters,
  results = 0,
  onClickFav
}: CharacterSearchProps) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <CharacterInputSearch results={results} />
      {isLoading ? (
        <Loader color="dark" />
      ) : (
        <div className={styles.characters}>
          {filteredCharacters && filteredCharacters.length ? (
            filteredCharacters.map((character) => {
              const isFav = !!favCharacters?.find(
                (item) => item.id === character.id
              );

              return (
                <CardCharacter
                  testId="card-character"
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
