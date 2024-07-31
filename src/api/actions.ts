"use server";

import { unstable_cache as cache } from "next/cache";
import { CharactersProps, ComicProps, DetailCharacterProps } from "../types";
import {
  CHARACTER_COMIC_CACHE_KEY,
  CHARACTER_DETAIL_CACHE_KEY,
  CHARACTERS_CACHE_KEY
} from "./constants";
import { fetchData } from "./utils";

export const getCharacters = cache(async () => {
  const response: CharactersProps = await fetchData("characters");
  return response;
}, [CHARACTERS_CACHE_KEY]);

export const getDetailCharacter = cache(
  async (id: string) => {
    const response: DetailCharacterProps = await fetchData(`characters/${id}`);
    return response;
  },
  [CHARACTER_DETAIL_CACHE_KEY]
);

export const getComic = cache(
  async (url: string) => {
    const response: ComicProps = await fetchData(url, false);
    return response;
  },
  [CHARACTER_COMIC_CACHE_KEY]
);
