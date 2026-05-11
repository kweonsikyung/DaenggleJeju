import { GetMeRes, PostDevLoginRes } from "@/types/auth";
import { getRequest, postRequest } from "./common";

/**
 * @function getMe
 * @description 현재 로그인된 사용자의 정보를 조회 (GET /auth/me)
 * @returns {Promise<GetMeRes>} 로그인된 사용자 정보
 */
export async function getMe(): Promise<GetMeRes> {
  return await getRequest<GetMeRes>("/auth/me");
}

/**
 * @function postDevLogin
 * @description 개발용 테스트 계정으로 로그인 (POST /auth/dev-login)
 * @returns {Promise<PostDevLoginRes>} 로그인된 사용자 정보
 */
export async function postDevLogin(): Promise<PostDevLoginRes> {
  return await postRequest<PostDevLoginRes, null>("/auth/dev-login", null);
}

/**
 * @function postDevLogout
 * @description 개발용 테스트 계정을 로그아웃 (POST /auth/dev-logout)
 * @returns {Promise<void>} 본문 없는 성공 응답
 */
export async function postDevLogout(): Promise<void> {
  await postRequest<void, null>("/auth/dev-logout", null);
}
