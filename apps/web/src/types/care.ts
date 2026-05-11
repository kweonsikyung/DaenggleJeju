/**
 * 자유 질문 Request
 * @description POST /care/ask 요청의 Path Parameter 타입
 * @property {string} question - 질문 내용
 */
export interface PostCareReq {
  question: string;
}

/**
 * 자유 질문 Response
 * @description POST /care/ask 요청의 요청의 성공 응답 타입
 */
export interface PostCareRes {
  message: {
    type: string;
    markdown: string;
  };
}
