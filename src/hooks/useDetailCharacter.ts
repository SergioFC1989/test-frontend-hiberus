"use client";

import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";

import { useCallback, useEffect, useRef, useState } from "react";

export const useDetailCharacter = (id: string) => {
  const {
    detailCharacter,
    setDetailCharacter,
    comics,
    setComics,
    isLoading,
    setIsLoading
  } = useAppConfig();

  const controllerDetailRef = useRef<AbortController | null>(null);
  const controllerComicRef = useRef<AbortController | null>(null);

  const [isLoadingComic, setIsLoadingComic] = useState(false);

  const handleImageComics = useCallback(async () => {
    setIsLoadingComic(true);
    setTimeout(async () => {
      try {
        const promises =
          detailCharacter?.data.results[0]?.comics.items.map(async (item) => {
            controllerComicRef.current = new AbortController();
            const response = await fetcher(
              `/api/get-comic?url=${item.resourceURI}`,
              controllerComicRef.current?.signal
            );
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
    }, 100);
  }, [detailCharacter?.data.results, setComics, setIsLoadingComic]);

  const handleFetchSingleCharacter = useCallback(async () => {
    try {
      setIsLoading(true);
      controllerDetailRef.current = new AbortController();
      const response = await fetcher(
        `/api/get-detail-character?id=${id}`,
        controllerDetailRef.current?.signal
      );
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
      setIsLoading(false);
    };
  }, [handleFetchSingleCharacter, setDetailCharacter, setIsLoading]);

  useEffect(() => {
    handleImageComics();

    return () => {
      setComics([]);
      setIsLoadingComic(false);
      if (controllerComicRef.current) {
        controllerComicRef.current.abort();
      }
    };
  }, [handleImageComics, setComics, setIsLoadingComic]);

  return {
    detailCharacter,
    comics,
    isLoading,
    isLoadingComic
  };
};
