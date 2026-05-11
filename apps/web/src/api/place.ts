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
import { createQueryString } from "@/utils/createQueryString";
import { getRequest } from "./common";

/**
 * @function getPlaceList
 * @description 장소 목록 리스트뷰 조회 (GET /places/list)
 * @param {GetPlaceListReq} params - Query Parameter 객체
 * @returns {Promise<GetPlaceListRes>} 장소 목록과 전체 개수를 포함한 응답
 */
export async function getPlaceList(params: GetPlaceListReq): Promise<GetPlaceListRes> {
  const query = createQueryString(params);
  return await getRequest<GetPlaceListRes>(`/places/list?${query}`);
}

/**
 * @function getPlaceMap
 * @description 장소 목록 지도뷰 조회 (GET /places/map)
 * @param {GetPlaceMapReq} params - Query Parameter 객체
 * @returns {Promise<GetPlaceMapRes>} 장소 아이템 배열 응답
 */
export async function getPlaceMap(params: GetPlaceMapReq): Promise<GetPlaceMapRes> {
  const query = createQueryString(params);
  return await getRequest<GetPlaceMapRes>(`/places/map?${query}`);
}

/**
 * @function getPlaceSearch
 * @description 장소 검색 (GET /places/search)
 * @param {GetPlaceSearchReq} params - Query Parameter 객체
 * @returns {Promise<GetPlaceSearchRes>} 검색된 장소 목록과 전체 개수를 포함한 응답
 */
export async function getPlaceSearch(params: GetPlaceSearchReq): Promise<GetPlaceSearchRes> {
  const query = createQueryString(params);
  return await getRequest<GetPlaceSearchRes>(`/places/search?${query}`);
}

/**
 * @function getPlaceDetail
 * @description 장소 단일 정보 조회 (GET /places/{contentId})
 * @param {GetPlaceDetailReq} params - Parameter 및 Query Parameter 객체
 * @returns {Promise<GetPlaceDetailRes>} 장소 단일 정보 응답
 */
export async function getPlaceDetail(params: GetPlaceDetailReq): Promise<GetPlaceDetailRes> {
  const { contentId, ...restParams } = params;
  const query = createQueryString(restParams);
  const queryString = query ? `?${query}` : "";
  return await getRequest<GetPlaceDetailRes>(`/places/${contentId}${queryString}`);
}

/**
 * @function getPlaceFullDetail
 * @description 장소 상세 정보 전체 조회 (GET /places/{contentId}/full)
 * @param {GetPlaceFullDetailReq} params - Parameter 및 Query Parameter 객체
 * @returns {Promise<GetPlaceFullDetailRes>} 장소 상세 정보 전체 응답
 */
export async function getPlaceFullDetail(
  params: GetPlaceFullDetailReq
): Promise<GetPlaceFullDetailRes> {
  const { contentId, ...restParams } = params;
  const query = createQueryString(restParams);
  const queryString = query ? `?${query}` : "";
  return await getRequest<GetPlaceFullDetailRes>(`/places/${contentId}/full${queryString}`);
}
