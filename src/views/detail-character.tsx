"use client";

import { CharacterDetailPage } from "@/components/character-detail-page";
import { useDetailCharacter } from "@/hooks/useDetailCharacter";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";

interface DetailCharacterProps {
  id: string;
}

export const DetailCharacter = ({ id }: DetailCharacterProps) => {
  const { detailCharacter, isLoading } = useDetailCharacter(id);
  const { handleSaveFavCharacter, favCharacters } = useFavoriteCharacters();

  return (
    <CharacterDetailPage
      data={detailCharacter?.data.results[0]!}
      isLoading={isLoading}
      favCharacters={favCharacters}
      onClickFav={handleSaveFavCharacter}
    />
  );
};
