import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";

export const useCharacterInputSearch = () => {
  const {
    characters,
    isLoading,
    setIsLoading,
    searchValue,
    setSearchValue,
    filteredCharacters,
    setFilteredCharacters
  } = useAppConfig();
  const controllerRef = useRef<AbortController | null>(null);

  const results = useMemo(
    () =>
      filteredCharacters?.data.results.length ??
      characters?.data.results.length,
    [characters?.data.results.length, filteredCharacters?.data.results.length]
  );

  const handleFilterCharacters = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    if (!searchValue.length) {
      setFilteredCharacters(characters);
    }

    if (searchValue.length && e.key === "Enter") {
      try {
        setIsLoading(true);
        controllerRef.current = new AbortController();
        const response = await fetcher(
          `/api/get-filtered-characters?nameStartsWith=${searchValue.toLowerCase()}`,
          controllerRef.current?.signal
        );
        console.log(response);
        setFilteredCharacters(response);
      } catch (error) {
        console.error("Error to get filtered characters");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    isLoading,
    searchValue,
    setSearchValue,
    handleFilterCharacters,
    results
  };
};
