"use server";

import { unstable_cache as cache } from "next/cache";
import { CharactersProps } from "../types";
import { CHARACTER_CACHE_KEY } from "./constants";
import { fetchData } from "./utils";

export const getCharacters = cache(async () => {
  const response: CharactersProps = await fetchData("characters");
  return response;
}, [CHARACTER_CACHE_KEY]);
