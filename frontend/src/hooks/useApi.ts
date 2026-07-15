import { useState, useEffect, useRef } from 'react';

// Global cache to persist data across component unmounts and route changes
const globalCache = new Map<string, any>();
const globalPromises = new Map<string, Promise<any>>();

interface UseApiOptions<T> {
  url: string;
  initialData?: T;
  // How long to consider data fresh before re-fetching (default: 5 minutes)
  staleTime?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useApi<T>({ url, initialData = null as any, staleTime = 300000 }: UseApiOptions<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(() => {
    // Return cached data immediately if available (avoids initial loading state)
    if (globalCache.has(url)) {
      return globalCache.get(url)?.data;
    }
    return initialData;
  });
  
  // Only true if we have no data at all
  const [loading, setLoading] = useState<boolean>(!globalCache.has(url));
  const [error, setError] = useState<Error | null>(null);
  
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchData = async (force = false) => {
    // If not forcing, and we have fresh data in cache, skip fetch
    if (!force && globalCache.has(url)) {
      const cached = globalCache.get(url)!;
      if (Date.now() - cached.timestamp < staleTime) {
        if (mountedRef.current) {
          setLoading(false);
          // Only update state if data actually changed (rare for this path)
          if (JSON.stringify(data) !== JSON.stringify(cached.data)) {
            setData(cached.data);
          }
        }
        return;
      }
    }

    try {
      // Background revalidation or initial fetch
      if (!globalCache.has(url) && mountedRef.current) {
        setLoading(true);
      }
      
      let promise = globalPromises.get(url);
      
      // Request deduplication
      if (!promise) {
        promise = fetch(url).then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        });
        globalPromises.set(url, promise);
      }

      const json = await promise;
      
      // Parse out 'data' property if it's a standard API response wrapper
      const resultData = json.data !== undefined ? json.data : json;
      
      globalCache.set(url, {
        data: resultData,
        timestamp: Date.now()
      });

      if (mountedRef.current) {
        setData(resultData);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error(`API Error (${url}):`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // If we have stale cache, we keep showing it rather than showing an error
      }
    } finally {
      globalPromises.delete(url);
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error, refetch: () => fetchData(true) };
}
