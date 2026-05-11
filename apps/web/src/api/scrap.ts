import { getRequest, postRequest } from "@/api/common";
import { GetScrapListReq, GetScrapListRes, PostScrapReq, PostScrapRes } from "@/types/scrap";

/**
 * @function getScrapList
 * @description 나의 스크랩 목록을 조회 (GET /scraps/my)
 * @param {GetScrapListReq} params - Query Parameter 객체
 * @returns {Promise<GetScrapListRes>} 스크랩 목록과 전체 개수를 포함한 응답
 */
export async function getScrapList(params: GetScrapListReq): Promise<GetScrapListRes> {
  const query = new URLSearchParams({
    type: params.type,
    ...(params.limit && { limit: String(params.limit) }),
    ...(params.offset && { offset: String(params.offset) }),
  }).toString();

  return await getRequest<GetScrapListRes>(`/scraps/my?${query}`);
}

/**
 * @function postScrap
 * @description 스크랩을 추가하거나 삭제 (POST /scraps)
 * @param {PostScrapReq} payload - 요청 Body 객체
 * @returns {Promise<PostScrapRes>} 스크랩 처리 결과 응답
 */
export async function postScrap(payload: PostScrapReq): Promise<PostScrapRes> {
  return await postRequest<PostScrapRes, PostScrapReq>("/scraps", payload);
}
