"use client";

import { useAppConfig } from "@/contexts/app-config-context";
import { fetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export const useDetailCharacter = (id: string) => {
  const { state, dispatch } = useAppConfig();

  const controllersDetailRef = useRef<AbortController[]>([]);
  const controllersComicRef = useRef<AbortController[]>([]);

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingComic, setIsLoadingComic] = useState(true);

  const handleImageComics = useCallback(async () => {
    setTimeout(async () => {
      try {
        const promises =
          state.detailCharacter?.data.results[0]?.comics.items.map(
            async (item) => {
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
            }
          ) || [];

        const comicsData = await Promise.all(promises);
        dispatch({ type: "SET_COMICS", payload: comicsData });
      } catch (error) {
        console.error("Error to get comics");
      } finally {
        setIsLoadingComic(false);
      }
    }, 100);
  }, [dispatch, state.detailCharacter]);

  const handleFetchSingleCharacter = useCallback(async () => {
    try {
      const controller = new AbortController();
      controllersDetailRef.current.push(controller);
      const response = await fetcher(
        `/api/get-detail-character?id=${id}`,
        controller.signal
      );
      dispatch({ type: "SET_DETAIL_CHARACTER", payload: response });
    } catch (error) {
      console.error("Error to get single character");
    } finally {
      setIsLoadingDetail(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    handleFetchSingleCharacter();

    return () => {
      if (controllersDetailRef.current.length) {
        controllersDetailRef.current.forEach((controller) =>
          controller.abort()
        );
        controllersDetailRef.current = [];
      }

      dispatch({ type: "SET_DETAIL_CHARACTER", payload: null });
    };
  }, [dispatch, handleFetchSingleCharacter]);

  useEffect(() => {
    handleImageComics();

    return () => {
      if (controllersComicRef.current.length) {
        controllersComicRef.current.forEach((controller) => controller.abort());
        controllersComicRef.current = [];
      }

      dispatch({ type: "SET_COMICS", payload: [] });
    };
  }, [dispatch, handleImageComics]);

  return {
    detailCharacter: state.detailCharacter?.data.results[0],
    comics: state.comics,
    isLoadingDetail,
    isLoadingComic
  };
};
