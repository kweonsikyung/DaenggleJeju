import useSWRMutation from "swr/mutation";
import { ApiError } from "@/api/common";
import { postPreference } from "@/api/preference";
import { PostPreferenceReq, PostPreferenceRes } from "@/types/preference";

/**
 * @hook usePostPreference
 * @description 사용자의 여행 스타일 취향을 저장/조회하는 SWR Mutation 훅
 * @returns 취향 저장 요청을 실행하는 trigger 함수, 실행 중 로딩 상태, 에러 객체
 */
export function usePostPreference() {
  const { trigger, isMutating, error } = useSWRMutation<
    PostPreferenceRes,
    ApiError,
    string,
    PostPreferenceReq
  >("/members/preference", (url, { arg }) => postPreference(arg));

  return {
    savePreference: trigger,
    isSaving: isMutating,
    saveError: error,
  };
}
