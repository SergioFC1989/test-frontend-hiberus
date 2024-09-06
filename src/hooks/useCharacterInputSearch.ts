import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";

export const useCharacterInputSearch = () => {
  const { state, dispatch } = useAppConfig();
  const controllerRef = useRef<AbortController | null>(null);

  const results = useMemo(
    () =>
      state.filteredCharacters?.data.results.length ??
      state.characters?.data.results.length,
    [
      state.characters?.data.results.length,
      state.filteredCharacters?.data.results.length
    ]
  );

  const handleFilterCharacters = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    if (state.searchValue.length && e.key === "Enter") {
      try {
        dispatch({ type: "SET_IS_LOADING", payload: true });
        controllerRef.current = new AbortController();
        const response = await fetcher(
          `/api/get-filtered-characters?nameStartsWith=${state.searchValue.toLowerCase()}`,
          controllerRef.current?.signal
        );
        dispatch({ type: "SET_FILTERED_CHARACTERS", payload: response });
      } catch (error) {
        console.error("Error to get filtered characters");
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: e.target.value });
  };

  useEffect(() => {
    if (!state.searchValue.length) {
      dispatch({ type: "SET_FILTERED_CHARACTERS", payload: state.characters });
    }
  }, [dispatch, state.characters, state.searchValue.length]);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    isLoading: state.isLoading,
    searchValue: state.searchValue,
    handleOnChange,
    handleFilterCharacters,
    results
  };
};
