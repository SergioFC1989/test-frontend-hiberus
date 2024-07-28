import cryptoJS from "crypto-js";
import qs from "qs";
import { URL_BASE } from "./constants";

const getUnixTimestamp = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000).toString();
};

const getHash = () => {
  return cryptoJS
    .MD5(
      `${getUnixTimestamp()}${process.env.API_KEY_PRIVATE}${process.env.API_KEY_PUBLIC}`
    )
    .toString();
};

const params = {
  apikey: process.env.API_KEY_PUBLIC,
  ts: getUnixTimestamp(),
  hash: getHash(),
  limit: 20,
  offset: 0
};

/**
 * Fetches data from the specified URL.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if the HTTP response is not successful.
 */
export const fetchData = async (url: string) => {
  const queryString = qs.stringify(params);
  const response = await fetch(`${URL_BASE}/${url}?${queryString}`, {
    cache: "force-cache",
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
