import { PostPreferenceReq, PostPreferenceRes } from "@/types/preference";
import { postRequest } from "./common";

/**
 * @function postPreference
 * @description 사용자의 여행 스타일 취향을 저장 (POST /members/preference)
 * @param {PostPreferenceReq} payload - 요청 Body 객체
 * @returns {Promise<PostPreferenceRes>} 저장된 여행 스타일 정보
 */
export async function postPreference(payload: PostPreferenceReq): Promise<PostPreferenceRes> {
  return await postRequest<PostPreferenceRes, PostPreferenceReq>("/members/preference", payload);
}
