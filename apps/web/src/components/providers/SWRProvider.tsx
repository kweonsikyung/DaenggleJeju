"use client";

import { SWRConfig } from "swr";
import { ApiError, getRequest } from "@/api/common";

/**
 * GET 요청을 위한 전역 fetcher 함수
 */
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => getRequest(url),
        onError: (err, key) => {
          if (err instanceof ApiError) {
          } else {
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
