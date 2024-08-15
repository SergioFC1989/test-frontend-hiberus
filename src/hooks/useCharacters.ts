import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

export const useCharacters = () => {
  const {
    characters,
    setCharacters,
    isLoading,
    setIsLoading,
    filteredCharacters
  } = useAppConfig();
  const controllerRef = useRef<AbortController | null>(null);

  const handleFetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      controllerRef.current = new AbortController();
      const response = await fetcher(
        "/api/get-characters",
        controllerRef.current?.signal
      );
      setCharacters(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setCharacters, setIsLoading]);

  useEffect(() => {
    handleFetchCharacters();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [handleFetchCharacters]);

  return {
    characters: characters?.data.results,
    filteredCharacters: filteredCharacters?.data.results,
    isLoading
  };
};
