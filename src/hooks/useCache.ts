import { useCallback, useEffect, useMemo, useState } from "react";

type CacheEntry<T> = {
  timestamp: number;
  value: T;
};

const CACHE_EXPIRATION_TIME = 3600 * 1000;

export const useCache = <T>(key: string) => {
  const [cache, setCache] = useState<T | null>(null);

  const handleGetCache = useCallback(() => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }, [key]);

  const handleClearCache = useCallback(() => {
    return localStorage.removeItem(key);
  }, [key]);

  const handleSaveCache = useCallback(
    (data: T) => {
      const cacheEntry: CacheEntry<T> = {
        timestamp: Date.now(),
        value: data
      };

      localStorage.setItem(key, JSON.stringify(cacheEntry));
      setCache(data);
    },
    [key]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedData = handleGetCache();

      if (!cachedData) {
        return;
      }

      Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME
        ? setCache(cachedData.value)
        : handleClearCache();
    }
  }, [handleClearCache, handleGetCache, key]);

  const values = useMemo(
    () => ({ cache, handleGetCache, handleClearCache, handleSaveCache }),
    [cache, handleGetCache, handleClearCache, handleSaveCache]
  );

  return values;
};
