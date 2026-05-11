import useSWR from "swr";
import { ApiError } from "@/api/common";
import {
  getDaenggleAccommodations,
  getDaenggleConcepts,
  getDaengglePlaceRecommendations,
  getDaengglePlacesAll,
  getDaengglePlacesMap,
  getDaengglePreference,
  getDaenggleRegions,
  getDaenggleSearch,
  getDaenggleTrending,
} from "@/api/daenggle";
import {
  DaenggleConceptShelf,
  DaengglePlaceRecommendationsResult,
  DaengglePlacesAllResult,
  DaengglePlacesMapResult,
  // Result Types
  DaenggleVideoListResult,
  GetDaenggleAccommodationsReq,
  GetDaenggleConceptsReq,
  GetDaengglePlaceRecommendationsReq,
  GetDaengglePlacesMapReq,
  GetDaengglePreferenceReq,
  GetDaenggleRegionsReq,
  GetDaenggleSearchReq,
  GetDaenggleTrendingReq,
} from "@/types/daenggle";

/**
 * @hook useDaenggleAccommodations
 * @description SWR 훅: 댕글 숙소 동영상 목록 조회
 */
export function useDaenggleAccommodations(params?: GetDaenggleAccommodationsReq) {
  const key = params ? ["/daenggle/accommodations", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaenggleVideoListResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaenggleAccommodationsReq]) =>
      getDaenggleAccommodations(queryParams)
  );

  return {
    daenggleAccommodationsData: data,
    error,
    isLoading,
    mutateDaenggleAccommodations: mutate,
  };
}

/**
 * @hook useDaenggleTrending
 * @description SWR 훅: 댕글 트렌딩 동영상 목록 조회
 */
export function useDaenggleTrending(params?: GetDaenggleTrendingReq) {
  const key = params ? ["/daenggle/trending", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaenggleVideoListResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaenggleTrendingReq]) => getDaenggleTrending(queryParams)
  );

  return {
    daenggleTrendingData: data,
    error,
    isLoading,
    mutateDaenggleTrending: mutate,
  };
}

/**
 * @hook useDaenggleRegions
 * @description SWR 훅: 댕글 지역별 동영상 목록 조회
 */
export function useDaenggleRegions(params?: GetDaenggleRegionsReq) {
  const key = params ? ["/daenggle/regions", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaenggleVideoListResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaenggleRegionsReq]) => getDaenggleRegions(queryParams)
  );

  return {
    daenggleRegionsData: data,
    error,
    isLoading,
    mutateDaenggleRegions: mutate,
  };
}

/**
 * @hook useDaengglePreference
 * @description SWR 훅: 댕글 사용자 취향 기반 동영상 목록 조회
 */
export function useDaengglePreference(params?: GetDaengglePreferenceReq) {
  const key = params ? ["/daenggle/preference", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaenggleVideoListResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaengglePreferenceReq]) => getDaengglePreference(queryParams)
  );

  return {
    daengglePreferenceData: data,
    error,
    isLoading,
    mutateDaengglePreference: mutate,
  };
}

/**
 * @hook useDaenggleSearch
 * @description SWR 훅: 댕글 동영상 검색
 */
export function useDaenggleSearch(params?: GetDaenggleSearchReq) {
  const key = params && params.q ? ["/daenggle/search", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaenggleVideoListResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaenggleSearchReq]) => getDaenggleSearch(queryParams)
  );

  return {
    daenggleSearchData: data,
    error,
    isLoading,
    mutateDaenggleSearch: mutate,
  };
}

/**
 * @hook useDaenggleConcepts
 * @description SWR 훅: 댕글 콘셉트별 동영상 목록 조회
 */
export function useDaenggleConcepts(params?: GetDaenggleConceptsReq) {
  const key = params && params.conceptKeys.length > 0 ? ["/daenggle/concepts", params] : null;

  const { data, error, isLoading, mutate } = useSWR<{ shelves: DaenggleConceptShelf[] }, ApiError>(
    key,
    ([, queryParams]: [string, GetDaenggleConceptsReq]) => getDaenggleConcepts(queryParams)
  );

  return {
    daenggleConceptsData: data,
    error,
    isLoading,
    mutateDaenggleConcepts: mutate,
  };
}

/**
 * @hook useDaengglePlaceRecommendations
 * @description SWR 훅: 댕글 장소 기반 추천 동영상 목록 조회
 */
export function useDaengglePlaceRecommendations(params?: GetDaengglePlaceRecommendationsReq) {
  const key = params ? [`/daenggle/places/${params.contentId}/recommendations`, params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaengglePlaceRecommendationsResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaengglePlaceRecommendationsReq]) =>
      getDaengglePlaceRecommendations(queryParams)
  );

  return {
    daengglePlaceRecommendationsData: data,
    error,
    isLoading,
    mutateDaengglePlaceRecommendations: mutate,
  };
}

/**
 * @hook useDaengglePlacesAll
 * @description SWR 훅: 장소 연관 댕글 영상 리스트 전체 조회
 */
export function useDaengglePlacesAll() {
  const key = "/daenggle/places/all";

  const { data, error, isLoading, mutate } = useSWR<DaengglePlacesAllResult, ApiError>(
    key,
    getDaengglePlacesAll
  );

  return {
    daengglePlacesAllData: data,
    error,
    isLoading,
    mutateDaengglePlacesAll: mutate,
  };
}

/**
 * @hook useDaengglePlacesMap
 * @description SWR 훅: 지도용 장소 연관 댕글 영상 조회
 */
export function useDaengglePlacesMap(params?: GetDaengglePlacesMapReq) {
  const key = params ? ["/daenggle/places/map", params] : null;

  const { data, error, isLoading, mutate } = useSWR<DaengglePlacesMapResult, ApiError>(
    key,
    ([, queryParams]: [string, GetDaengglePlacesMapReq]) => getDaengglePlacesMap(queryParams)
  );

  return {
    daengglePlacesMapData: data,
    error,
    isLoading,
    mutateDaengglePlacesMap: mutate,
  };
}
