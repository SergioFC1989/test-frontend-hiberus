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
      setIsLoadingComic(true);

      const promises =
        detailCharacter?.data.results[0]?.comics.items.map(async (item) => {
          const response = await getComic(item.resourceURI);
          const { path, extension } = response.data.results[0].thumbnail;
          const thumbnail = `${path}.${extension}`;
          return { name: item.name, thumbnail };
        }) || [];

      const comicsData = await Promise.all(promises);

      setComics((prev) => [...prev, ...comicsData]);
    } catch (error) {
      console.error("Error to get comics");
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
      console.error("Error to get single character");
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
