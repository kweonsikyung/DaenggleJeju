/**
 * 지역 컨텍스트 ID
 * @description 사용자가 선호하는 지역을 나타내는 코드
 */
export type RegionContextId =
  | "PLACE_jeju_si"
  | "PLACE_aewol"
  | "PLACE_jocheon"
  | "PLACE_seogwipo_si"
  | "PLACE_andeok"
  | "PLACE_seongsan";

/**
 * 여행 스타일 코드
 * @description 사용자가 선호하는 여행 스타일을 나타내는 코드
 */
export type StyleCode = "RELAX" | "OUTDOOR" | "RESORT" | "CAFE" | "ACTIVITY";

/**
 * 사용자 여행 스타일 저장 Request
 * @description POST /members/preference 요청의 Body 타입
 * @property {RegionContextId[]} regionContextIds - 선호 지역 ID 배열 (최대 6개)
 * @property {StyleCode[]} styleCodes - 선호 스타일 코드 배열 (최대 5개)
 */
export interface PostPreferenceReq {
  regionContextIds: RegionContextId[];
  styleCodes: StyleCode[];
}

/**
 * 사용자 여행 스타일 저장 Response
 * @description POST /members/preference 요청의 성공 응답 타입
 * @property {RegionContextId[]} regionContextIds - 저장된 선호 지역 ID 배열
 * @property {StyleCode[]} styleCodes - 저장된 선호 스타일 코드 배열
 */
export interface PostPreferenceRes {
  regionContextIds: RegionContextId[];
  styleCodes: StyleCode[];
}
