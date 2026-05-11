import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ApiError } from "@/api/common";
import { getMyFootprints, getPlaceFootprints, postFootprint } from "@/api/footprint";
import {
  GetMyFootprintsReq,
  GetMyFootprintsRes,
  GetPlaceFootprintsReq,
  GetPlaceFootprintsRes,
  PostFootprintReq,
  PostFootprintRes,
} from "@/types/footprint";

/**
 * @hook usePostFootprint
 * @description 발자국(리뷰)을 생성하는 SWR Mutation 훅
 * @returns 발자국 생성 요청을 실행하는 trigger 함수, 실행 중 로딩 상태, 에러 객체
 */
export function usePostFootprint() {
  const { trigger, isMutating, error } = useSWRMutation<
    PostFootprintRes,
    ApiError,
    string,
    PostFootprintReq
  >(
    "/footprints", // Mutation Key
    (url, { arg }) => postFootprint(arg)
  );

  return {
    createFootprint: trigger,
    isCreating: isMutating,
    createError: error,
  };
}

/**
 * @hook useMyFootprints
 * @description 내가 작성한 발자국 목록을 조회하는 SWR 훅
 * @param {GetMyFootprintsReq | undefined} params - Query Parameter 객체. 없으면 요청 안함.
 * @returns 나의 발자국 목록 데이터, 로딩 상태, 에러 객체, 수동 갱신 함수
 */
export function useMyFootprints(params?: GetMyFootprintsReq) {
  const key = params ? ["/footprints/my", params] : null;
  const { data, error, isLoading, mutate } = useSWR<GetMyFootprintsRes, ApiError>(
    key,
    ([, queryParams]: [string, GetMyFootprintsReq]) => getMyFootprints(queryParams)
  );

  return {
    myFootprintsData: data,
    error,
    isLoading,
    mutateMyFootprints: mutate,
  };
}

/**
 * @hook usePlaceFootprints
 * @description 특정 장소의 발자국 목록을 조회하는 SWR 훅
 * @param {GetPlaceFootprintsReq | undefined} params - contentId를 포함한 객체. 없으면 요청 안함.
 * @returns 장소별 발자국 목록 데이터, 로딩 상태, 에러 객체, 수동 갱신 함수
 */
export function usePlaceFootprints(params?: GetPlaceFootprintsReq) {
  const key = params?.contentId ? [`/footprints/places/${params.contentId}`, params] : null;

  const { data, error, isLoading, mutate } = useSWR<GetPlaceFootprintsRes, ApiError>(
    key,
    ([, queryParams]: [string, GetPlaceFootprintsReq]) => getPlaceFootprints(queryParams)
  );

  return {
    placeFootprintsData: data,
    error,
    isLoading,
    mutatePlaceFootprints: mutate,
  };
}
