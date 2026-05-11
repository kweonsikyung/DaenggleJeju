/**
 * 반려견 사이즈 코드
 * @description SMALL, MEDIUM, LARGE, XLARGE 중 하나의 값을 가짐
 */
export type PetSizeCode = "SMALL" | "MEDIUM" | "LARGE" | "XLARGE";

/**
 * 반려견 프로필 생성 Request
 * @description POST /pets/profiles 요청의 Body 타입
 * @property {string} name - 반려견 이름 (1~50자)
 * @property {PetSizeCode} sizeCode - 반려견 사이즈 코드
 * @property {number} breedId - 견종 ID (정수)
 * @property {string} birthDate - 반려견 생년월일 (YYYY-MM-DD 형식)
 */
export interface PostPetProfileReq {
  name: string;
  sizeCode: PetSizeCode;
  breedId: number;
  birthDate: string;
}

/**
 * 반려견 프로필 조회 Request
 * @description GET /pets/profiles/{petId} 요청의 Path Parameter 타입
 * @property {number} petId - 조회할 반려견 프로필의 ID
 */
export interface GetPetProfileReq {
  petId: number;
}

/**
 * 반려견 프로필 생성 및 조회 Response
 * @description POST /pets/profiles, GET /pets/profiles/{petId} 요청의 성공 응답 타입
 * @property {number} id - 프로필 고유 ID
 * @property {string} name - 반려견 이름
 * @property {string} breedNameKo - 견종 한글 이름
 * @property {string} sizeLabelKo - 사이즈 한글 라벨 (e.g., "대형견(16~30kg)")
 * @property {string | null} ageYears - 나이 (YYYY-MM 형식, 생일 전이면 null)
 */
export interface PetProfileRes {
  id: number;
  name: string;
  breedNameKo: string;
  sizeLabelKo: string;
  ageYears: number | null;
}
