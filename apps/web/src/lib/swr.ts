import useSWR, { type SWRConfiguration } from "swr";

export function useImmutableSWR<T>(key: string | null, config?: SWRConfiguration<T>) {
  return useSWR<T>(key, {
    revalidateIfStale: false,
    revalidateOnFocus: false,

    revalidateOnReconnect: false,
    ...config,
  });
}
