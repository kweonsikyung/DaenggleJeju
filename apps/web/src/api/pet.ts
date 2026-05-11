import { GetPetProfileReq, PetProfileRes, PostPetProfileReq } from "@/types/pet";
import { getRequest, postRequest } from "./common";

/**
 * @function postPetProfile
 * @description 새 반려견 프로필을 저장 (POST /pets/profiles)
 * @param {PostPetProfileReq} payload - 요청 Body 객체
 * @returns {Promise<PetProfileRes>} 생성된 반려견 프로필 정보
 */
export async function postPetProfile(payload: PostPetProfileReq): Promise<PetProfileRes> {
  return await postRequest<PetProfileRes, PostPetProfileReq>("/pets/profiles", payload);
}

/**
 * @function getPetProfile
 * @description 내 반려견 프로필을 조회 (GET /pets/profiles/{petId})
 * @param {GetPetProfileReq} params - Path Parameter 객체
 * @returns {Promise<PetProfileRes>} 반려견 프로필 정보
 */
export async function getPetProfile(params: GetPetProfileReq): Promise<PetProfileRes> {
  const { petId } = params;
  return await getRequest<PetProfileRes>(`/pets/profiles/${petId}`);
}

/**
 * @function getPetProfileList
 * @description 내 반려견 프로필 목록 조회 (GET /pets/profiles-list)
 * @returns {Promise<PetProfileRes>} 반려견 프로필 정보
 */
export async function getPetProfileList(): Promise<PetProfileRes[]> {
  return await getRequest<PetProfileRes[]>(`/pets/profiles-list`);
}
