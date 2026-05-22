"use client";

import { useRouter } from "next/navigation";
import { SWRConfig, type SWRConfiguration } from "swr";
import { ApiError, getRequest } from "@/api/common";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleError = (err: unknown) => {
    if (!(err instanceof ApiError) || err.status !== 401) return;
    router.replace("/login");
  };

  const swrConfig: SWRConfiguration = {
    fetcher: (url: string) => getRequest(url),

    revalidateOnFocus: false,
    dedupingInterval: 3000,

    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) return;
      if (retryCount >= 3) return;

      setTimeout(() => revalidate({ retryCount }), Math.min(1000 * 2 ** retryCount, 30000));
    },

    onError: handleError,
  };

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};
