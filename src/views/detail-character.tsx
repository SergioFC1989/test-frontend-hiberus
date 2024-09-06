"use client";

import { CharacterDetail } from "@/components/character-detail/character-detail";
import { ComicList } from "@/components/comic-list/comic-list";
import { useDetailCharacter } from "@/hooks/useDetailCharacter";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

interface DetailCharacterProps {
  id: string;
}

export const DetailCharacter = ({ id }: DetailCharacterProps) => {
  const { detailCharacter, comics, isLoadingComic } = useDetailCharacter(id);
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <div>
      <CharacterDetail
        data={detailCharacter!}
        favCharacters={favCharacters}
        onClickFav={handleSaveFavCharacter}
      />
      <ComicList comics={comics} isLoading={isLoadingComic} />
    </div>
  );
};
