"use client";

import { CharacterDetailPage } from "@/components/character-detail-page";
import { ComicsPage } from "@/components/comics-page";
import { useDetailCharacter } from "@/hooks/useDetailCharacter";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

interface DetailCharacterProps {
  id: string;
}

export const DetailCharacter = ({ id }: DetailCharacterProps) => {
  const { detailCharacter, comics, isLoading, isLoadingComic } =
    useDetailCharacter(id);
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <div>
      <CharacterDetailPage
        data={detailCharacter?.data.results[0]!}
        isLoading={isLoading}
        favCharacters={favCharacters}
        onClickFav={handleSaveFavCharacter}
      />
      <ComicsPage comics={comics} isLoading={isLoadingComic} />
    </div>
  );
};
