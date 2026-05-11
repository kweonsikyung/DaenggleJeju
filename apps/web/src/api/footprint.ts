import {
  GetMyFootprintsReq,
  GetMyFootprintsRes,
  GetPlaceFootprintsReq,
  GetPlaceFootprintsRes,
  PostFootprintReq,
  PostFootprintRes,
} from "@/types/footprint";
import { createQueryString } from "@/utils/createQueryString";
import { getRequest, postRequest } from "./common";

/**
 * @function postFootprint
 * @description 발자국(리뷰)을 생성 (POST /footprints)
 * @param {PostFootprintReq} payload - 요청 Body 객체
 * @returns {Promise<PostFootprintRes>} 생성된 발자국 정보
 */
export async function postFootprint(payload: PostFootprintReq): Promise<PostFootprintRes> {
  return await postRequest<PostFootprintRes, PostFootprintReq>("/footprints", payload);
}

/**
 * @function getMyFootprints
 * @description 내가 작성한 발자국 목록을 조회 (GET /footprints/my)
 * @param {GetMyFootprintsReq} params - Query Parameter 객체
 * @returns {Promise<GetMyFootprintsRes>} 나의 발자국 목록
 */
export async function getMyFootprints(params: GetMyFootprintsReq): Promise<GetMyFootprintsRes> {
  const query = createQueryString(params);
  return await getRequest<GetMyFootprintsRes>(`/footprints/my?${query}`);
}

/**
 * @function getPlaceFootprints
 * @description 특정 장소의 발자국 목록을 조회 (GET /footprints/places/{contentId})
 * @param {GetPlaceFootprintsReq} params - Path 및 Query Parameter 객체
 * @returns {Promise<GetPlaceFootprintsRes>} 장소별 발자국 목록
 */
export async function getPlaceFootprints(
  params: GetPlaceFootprintsReq
): Promise<GetPlaceFootprintsRes> {
  const { contentId, ...restParams } = params;
  const query = createQueryString(restParams);
  return await getRequest<GetPlaceFootprintsRes>(`/footprints/places/${contentId}?${query}`);
}
