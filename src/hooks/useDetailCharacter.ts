"use client";

import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export const useDetailCharacter = (id: string) => {
  const { detailCharacter, setDetailCharacter, comics, setComics } =
    useAppConfig();

  const controllersDetailRef = useRef<AbortController[]>([]);
  const controllersComicRef = useRef<AbortController[]>([]);

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingComic, setIsLoadingComic] = useState(true);

  const handleImageComics = useCallback(async () => {
    setTimeout(async () => {
      try {
        const promises =
          detailCharacter?.data.results[0]?.comics.items.map(async (item) => {
            const controller = new AbortController();
            controllersComicRef.current.push(controller);
            setIsLoadingComic(true);
            const response = await fetcher(
              `/api/get-comic?url=${item.resourceURI}`,
              controller.signal
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
      const controller = new AbortController();
      controllersDetailRef.current.push(controller);
      const response = await fetcher(
        `/api/get-detail-character?id=${id}`,
        controller.signal
      );
      setDetailCharacter(response);
    } catch (error) {
      console.error("Error to get single character");
    } finally {
      setIsLoadingDetail(false);
    }
  }, [id, setDetailCharacter, setIsLoadingDetail]);

  useEffect(() => {
    handleFetchSingleCharacter();

    return () => {
      if (controllersDetailRef.current.length) {
        controllersDetailRef.current.forEach((controller) =>
          controller.abort()
        );
        controllersDetailRef.current = [];
      }

      setDetailCharacter(null);
    };
  }, [handleFetchSingleCharacter, setDetailCharacter]);

  useEffect(() => {
    handleImageComics();

    return () => {
      if (controllersComicRef.current.length) {
        controllersComicRef.current.forEach((controller) => controller.abort());
        controllersComicRef.current = [];
      }

      setComics([]);
    };
  }, [handleImageComics, setComics]);

  return {
    detailCharacter,
    comics,
    isLoadingDetail,
    isLoadingComic
  };
};
