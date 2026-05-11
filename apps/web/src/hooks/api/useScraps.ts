import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ApiError } from "@/api/common";
import { postScrap } from "@/api/scrap";
import { GetScrapListReq, GetScrapListRes, PostScrapReq, PostScrapRes } from "@/types/scrap";

/**
 * @hook useScrapList
 * @description 나의 스크랩 목록을 조회하는 SWR 훅
 * @param {GetScrapListReq | undefined} params - Query Parameter 객체. 없으면 요청 안함.
 * @returns 스크랩 목록 데이터, 로딩 상태, 에러 객체, 수동 갱신 함수
 */
export function useScrapList(params?: GetScrapListReq) {
  // URLSearchParams를 사용해 쿼리 파라미터를 문자열로 만들어 key의 일부로 사용
  const key = params
    ? `/scraps/my?${new URLSearchParams({
        type: params.type,
        ...(params.limit && { limit: String(params.limit) }),
        ...(params.offset && { offset: String(params.offset) }),
      }).toString()}`
    : null; // params가 없으면 key를 null로 설정

  const { data, error, isLoading, mutate } = useSWR<GetScrapListRes, ApiError>(key);

  return {
    scrapData: data,
    error,
    isLoading,
    mutateScraps: mutate,
  };
}

/**
 * @hook usePostScrap
 * @description 스크랩을 토글(추가/삭제)하는 SWR Mutation 훅
 * @returns 스크랩 POST 요청을 실행하는 trigger 함수, 실행 중 로딩 상태, 에러 객체
 */
export function usePostScrap() {
  const { trigger, isMutating, error } = useSWRMutation<
    PostScrapRes,
    ApiError,
    string,
    PostScrapReq
  >("/scraps", (url, { arg }) => postScrap(arg));

  return {
    postScrap: trigger,
    isPosting: isMutating,
    postError: error,
  };
}
