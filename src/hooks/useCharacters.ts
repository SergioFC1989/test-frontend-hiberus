import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

export const useCharacters = () => {
  const { state, dispatch } = useAppConfig();
  const controllerRef = useRef<AbortController | null>(null);

  const handleFetchCharacters = useCallback(async () => {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      controllerRef.current = new AbortController();
      const response = await fetcher(
        "/api/get-characters",
        controllerRef.current?.signal
      );
      dispatch({ type: "SET_CHARACTERS", payload: response });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchCharacters();
  }, [handleFetchCharacters]);

  return {
    characters: state.characters?.data.results,
    filteredCharacters: state.filteredCharacters?.data.results,
    isLoading: state.isLoading
  };
};
