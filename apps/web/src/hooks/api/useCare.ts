import useSWRMutation from "swr/mutation";
import { postCareQuestion } from "@/api/care";
import { ApiError } from "@/api/common";
import { PostCareReq, PostCareRes } from "@/types/care";

/**
 * @hook usePostCareQuestion
 * @description AI 여행케어에 자유 질문을 전송하는 SWR Mutation 훅
 * @returns 질문 전송을 실행하는 trigger 함수, 실행 중 로딩 상태, 에러 객체
 */
export function usePostCareQuestion() {
  const { trigger, isMutating, error } = useSWRMutation<PostCareRes, ApiError, string, PostCareReq>(
    "/care/ask",
    (url, { arg }) => postCareQuestion(arg)
  );

  return {
    askQuestion: trigger,
    isAsking: isMutating,
    askError: error,
  };
}
