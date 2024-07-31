"use client";

import { getComic, getDetailCharacter } from "@/api/actions";
import { useAppConfig } from "@/contexts/app-config-context";
import { useCallback, useEffect, useState } from "react";

export const useDetailCharacter = (id: string) => {
  const {
    detailCharacter,
    setDetailCharacter,
    comics,
    setComics,
    isLoading,
    setIsLoading
  } = useAppConfig();

  const [isLoadingComic, setIsLoadingComic] = useState(true);

  const handleImageComics = useCallback(async () => {
    try {
      detailCharacter?.data.results[0]?.comics.items.forEach(async (item) => {
        setIsLoadingComic(true);
        const response = await getComic(item.resourceURI);
        const { path, extension } = response.data.results[0].thumbnail;
        const thumbnail = `${path}.${extension}`;
        setComics((prev) => [...prev, { name: item.name, thumbnail }]);
      });
    } catch (error) {
      return alert("Error to get comics");
    } finally {
      setIsLoadingComic(false);
    }
  }, [detailCharacter?.data.results, setComics]);

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

    return () => {
      setDetailCharacter(null);
      setIsLoading(true);
    };
  }, [handleFetchSingleCharacter, setDetailCharacter, setIsLoading]);

  useEffect(() => {
    handleImageComics();

    return () => {
      setComics([]);
      setIsLoadingComic(true);
    };
  }, [handleImageComics, setComics]);

  return { detailCharacter, comics, isLoading, isLoadingComic };
};
