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

const configParams = {
  apikey: process.env.API_KEY_PUBLIC,
  ts: getUnixTimestamp(),
  hash: getHash(),
  limit: 20,
  offset: 0
};

const headers = {
  "Cache-Control": "public, max-age=3600, must-revalidate"
};

/**
 * Fetches data from the specified URL.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if the HTTP response is not successful.
 */
export const fetchData = async (
  url: string,
  hasUrlBase: boolean = true,
  params?: Record<string, any>
) => {
  const queryString = qs.stringify({ ...configParams, ...params });
  const _url = `${hasUrlBase ? `${URL_BASE}/${url}?${queryString}` : `${url}?${queryString}`}`;
  const response = await fetch(_url, {
    cache: "force-cache",
    headers
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const fetcher = (url: string, signal?: AbortSignal) =>
  fetch(url, { signal }).then((res) => res.json());
