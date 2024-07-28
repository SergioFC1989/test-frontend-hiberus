import { getCharacters } from "@/api/actions";
import { useAppConfig } from "@/contexts/app-config-context";
import { useCallback, useEffect, useState } from "react";

export const useHome = () => {
  const { characters, setCharacters, isLoading, setIsLoading } = useAppConfig();
  const [searchValue, setSearchValue] = useState("");

  const handleCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCharacters();
      setCharacters(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setCharacters, setIsLoading]);

  useEffect(() => {
    handleCharacters();
  }, [handleCharacters]);

  return { characters, setCharacters, searchValue, setSearchValue, isLoading };
};
