import { PostCareReq, PostCareRes } from "@/types/care";
import { postRequest } from "./common";

/**
 * @function postCareQuestion
 * @description AI 여행케어에 자유 질문을 전송 (POST /care/ask)
 * @param {PostCareReq} payload - 요청 Body 객체 (질문 내용)
 * @returns {Promise<PostCareRes>} AI의 답변
 */
export async function postCareQuestion(payload: PostCareReq): Promise<PostCareRes> {
  return await postRequest<PostCareRes, PostCareReq>("/care/ask", payload, {
    timeout: 30000,
  });
}
