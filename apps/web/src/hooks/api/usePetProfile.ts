import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ApiError } from "@/api/common";
import { postPetProfile } from "@/api/pet";
import { GetPetProfileReq, PetProfileRes, PostPetProfileReq } from "@/types/pet";

/**
 * @hook usePetProfile
 * @description 특정 반려견 프로필을 조회하는 SWR 훅
 * @param {GetPetProfileReq | undefined} params - petId를 포함한 객체. petId가 없으면 요청하지 않음.
 * @returns 반려견 프로필 데이터, 로딩 상태, 에러 객체
 */
export function usePetProfile(params?: GetPetProfileReq) {
  const key = params?.petId ? `/pets/profiles/${params.petId}` : null;

  const { data, error, isLoading } = useSWR<PetProfileRes, ApiError>(key);

  return {
    petProfile: data,
    error,
    isLoading,
  };
}

/**
 * @hook usePostPetProfile
 * @description 새 반려견 프로필을 생성하는 SWR Mutation 훅
 * @returns 프로필 생성 요청을 실행하는 trigger 함수, 실행 중 로딩 상태, 에러 객체
 */
export function usePostPetProfile() {
  const { trigger, isMutating, error } = useSWRMutation<
    PetProfileRes,
    ApiError,
    string,
    PostPetProfileReq
  >("/pets/profiles", (url, { arg }) => postPetProfile(arg));

  return {
    createPetProfile: trigger,
    isCreating: isMutating,
    createError: error,
  };
}

/**
 * @hook usePetProfileList
 * @description 내 모든 반려견 프로필 목록을 조회하는 SWR 훅
 * @returns 반려견 프로필 목록 데이터, 로딩 상태, 에러 객체
 */
export function usePetProfileList() {
  const { data, error, isLoading } = useSWR<PetProfileRes[], ApiError>("/pets/profiles-list");

  return {
    petProfileList: data,
    error,
    isLoading,
  };
}
