import { getCharacters } from "@/api/actions";
import { useAppConfig } from "@/contexts/app-config-context";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useHome = () => {
  const { characters, setCharacters, isLoading, setIsLoading } = useAppConfig();

  const [searchValue, setSearchValue] = useState("");
  const [filteredValue, setFilteredValue] = useState(characters?.data.results);

  const handleFetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCharacters();
      setCharacters(response);
    } catch (error) {
      return alert("Error to get characters");
    } finally {
      setIsLoading(false);
    }
  }, [setCharacters, setIsLoading]);

  const handleFilterCharacters = useCallback(() => {
    if (searchValue) {
      const filteredCharacters = characters?.data.results.filter((item) =>
        item.name.toUpperCase().includes(searchValue.toUpperCase())
      );
      setFilteredValue(filteredCharacters);
    } else {
      setFilteredValue(characters?.data.results);
    }
  }, [characters?.data.results, searchValue]);

  useEffect(() => {
    handleFilterCharacters();
  }, [handleFilterCharacters]);

  useEffect(() => {
    handleFetchCharacters();
  }, [handleFetchCharacters]);

  const values = useMemo(
    () => ({ searchValue, setSearchValue, filteredValue, isLoading }),
    [searchValue, setSearchValue, filteredValue, isLoading]
  );

  return values;
};
