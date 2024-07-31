"use client";

import { getDetailCharacter } from "@/api/actions";
import { useAppConfig } from "@/contexts/app-config-context";
import { useCallback, useEffect } from "react";

export const useDetailCharacter = (id: string) => {
  const { detailCharacter, setDetailCharacter, isLoading, setIsLoading } =
    useAppConfig();

  const handleFetchSingleCharacter = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getDetailCharacter(id);
      setDetailCharacter(response);
    } catch (error) {
      return alert("Error to get single character");
    } finally {
      setIsLoading(false);
    }
  }, [id, setDetailCharacter, setIsLoading]);

  useEffect(() => {
    handleFetchSingleCharacter();
  }, [handleFetchSingleCharacter]);

  return { detailCharacter, isLoading };
};
