/**
 * 사용자 정보 기본 타입
 * @description 로그인된 사용자의 기본 정보를 나타냅니다.
 * @property {number} id - 사용자 ID
 * @property {string} handle - 사용자 핸들 (닉네임)
 */
export interface User {
  id: number;
  handle: string;
}

/**
 * 현재 로그인된 사용자 정보 조회 Response
 * @description GET /auth/me 요청의 성공 응답 타입
 */
export type GetMeRes = User;

/**
 * 개발용 로그인 Response
 * @description POST /auth/dev-login 요청의 성공 응답 타입
 */
export type PostDevLoginRes = User;
