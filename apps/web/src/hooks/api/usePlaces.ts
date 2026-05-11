import useSWR from "swr";
import { ApiError } from "@/api/common";
import {
  getPlaceDetail,
  getPlaceFullDetail,
  getPlaceList,
  getPlaceMap,
  getPlaceSearch,
} from "@/api/place";
import {
  GetPlaceDetailReq,
  GetPlaceDetailRes,
  GetPlaceFullDetailReq,
  GetPlaceFullDetailRes,
  GetPlaceListReq,
  GetPlaceListRes,
  GetPlaceMapReq,
  GetPlaceMapRes,
  GetPlaceSearchReq,
  GetPlaceSearchRes,
} from "@/types/place";

/**
 * @hook usePlaceList
 * @description 장소 목록을 조회하는 SWR 훅
 */
export function usePlaceList(params?: GetPlaceListReq) {
  const key = params ? (["/places/list", params] as const) : null;

  const fetcher = (_key: readonly [string, GetPlaceListReq]) => {
    const [, p] = _key;
    return getPlaceList(p);
  };

  const { data, error, isLoading, mutate } = useSWR<GetPlaceListRes, ApiError>(key, fetcher);

  return { data, error, isLoading, mutate };
}

/**
 * @hook usePlaceMap
 * @description 지도 내 장소 목록을 조회하는 SWR 훅
 */
export function usePlaceMap(params: GetPlaceMapReq) {
  const key = params.bbox ? ["/places/map", JSON.stringify(params)] : null;
  const { data, error, isLoading, mutate } = useSWR<GetPlaceMapRes, ApiError>(key, () =>
    getPlaceMap(params)
  );
  return { data, error, isLoading, mutate };
}

/**
 * @hook usePlaceSearch
 * @description 장소를 검색하는 SWR 훅
 */
export function usePlaceSearch(params?: GetPlaceSearchReq | null) {
  const key = params?.q ? ["/places/search", JSON.stringify(params)] : null;

  const fetcher = params ? () => getPlaceSearch(params as GetPlaceSearchReq) : null;

  const { data, error, isLoading, mutate } = useSWR<GetPlaceSearchRes, ApiError>(key, fetcher);

  return { data, error, isLoading, mutate };
}

/**
 * @hook usePlaceDetail
 * @description 장소 단일 정보를 조회하는 SWR 훅
 */
export function usePlaceDetail(params: GetPlaceDetailReq) {
  const key = params.contentId ? ["/places", params.contentId, JSON.stringify(params)] : null;
  const { data, error, isLoading, mutate } = useSWR<GetPlaceDetailRes, ApiError>(key, () =>
    getPlaceDetail(params)
  );
  return { data, error, isLoading, mutate };
}

/**
 * @hook usePlaceFullDetail
 * @description 장소 상세 정보 전체를 조회하는 SWR 훅
 */
export function usePlaceFullDetail(params: GetPlaceFullDetailReq) {
  const key = params.contentId ? `/places/${params.contentId}/full` : null;

  const { data, error, isLoading, mutate } = useSWR<GetPlaceFullDetailRes, ApiError>(key, () =>
    getPlaceFullDetail(params)
  );
  return { data, error, isLoading, mutate };
}
