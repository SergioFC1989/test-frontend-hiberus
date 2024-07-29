"use server";

import { unstable_cache as cache } from "next/cache";
import { CharactersProps } from "../types";
import { fetchData } from "./utils";

export const getCharacters = cache(async () => {
  const response: CharactersProps = await fetchData("characters");
  return response;
}, ["characters-cache-key"]);
