import { useCallback, useEffect, useState } from 'react';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

// Shared across components and route changes; also dedupes in-flight requests
const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<unknown>>();

interface UseApiOptions {
  // null skips the request (e.g. data already available)
  url: string | null;
  // How long cached data counts as fresh before re-fetching (default: 5 minutes)
  staleTime?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function request(url: string) {
  let promise = inFlight.get(url);
  if (!promise) {
    promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json?.status && json.status !== 'success') throw new Error(json.message || 'Request failed.');
        // Unwrap the standard { status, data } API envelope
        return json?.data !== undefined ? json.data : json;
      })
      .finally(() => inFlight.delete(url));
    inFlight.set(url, promise);
  }
  return promise;
}

interface Result {
  url: string;
  data: unknown;
  error: Error | null;
}

async function load(url: string): Promise<Result> {
  try {
    const data = await request(url);
    cache.set(url, { data, timestamp: Date.now() });
    return { url, data, error: null };
  } catch (err) {
    console.error(`API Error (${url}):`, err);
    // Keep showing stale cached data if we have it
    return { url, data: cache.get(url)?.data ?? null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export function useApi<T>({ url, staleTime = 300000 }: UseApiOptions): UseApiResult<T> {
  // Result of the last finished request; ignored once `url` changes
  const [result, setResult] = useState<Result>({ url: '', data: null, error: null });

  useEffect(() => {
    if (!url) return;
    const entry = cache.get(url);
    if (entry && Date.now() - entry.timestamp < staleTime) return;

    let active = true;
    load(url).then((next) => {
      if (active) setResult(next);
    });
    return () => {
      active = false;
    };
  }, [url, staleTime]);

  const refetch = useCallback(async () => {
    if (url) setResult(await load(url));
  }, [url]);

  const settled = result.url === url;
  const cached = url ? cache.get(url) : undefined;
  return {
    data: ((settled ? result.data : cached?.data) as T) ?? null,
    loading: !!url && !settled && !cached,
    error: settled ? result.error : null,
    refetch,
  };
}
