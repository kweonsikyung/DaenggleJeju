/** @file api/common.ts
 * @module api/common
 * @description Axios를 사용한 API 요청 및 응답에 사용되는 공통 함수와 타입을 정의
 * @see {@link lib/api/client} API 요청에 사용되는 axios 인턴스
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "./client";

/**
 * API 공통 성공 응답 래퍼 타입
 */
export interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  result: T;
}

/**
 * API 공통 에러 응답 타입
 * HTTP 4xx, 5xx 에러 발생 시 response.data에 포함되는 공통 에러 구조
 */
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  code: string;
  errors?: unknown;
}

/**
 * 응답 데이터가 공통 에러 응답(ApiErrorResponse) 타입인지 확인하는 타입 가드
 */
function isApiErrorPayload(data: unknown): data is ApiErrorResponse {
  return (
    data != null &&
    typeof data === "object" &&
    "message" in data &&
    "code" in data &&
    "statusCode" in data
  );
}

/**
 * API 에러 정보를 담는 커스텀 에러 클래스
 */
export class ApiError extends Error {
  readonly code?: string;
  readonly status?: number;
  readonly errors?: unknown;

  constructor(message: string, status?: number, code?: string, errors?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

/**
 * @function extractApiErrorMessage
 * @description 예측 불가능한 API 에러 응답에서 최대한 의미있는 메시지를 추출하는 헬퍼 함수
 */
function extractApiErrorMessage(data: unknown): string {
  // 1. data가 문자열이면, 그대로 반환
  if (typeof data === "string") {
    return data;
  }

  // 2. data가 객체인 경우, 일반적인 에러 메시지 키를 순서대로 확인
  if (data && typeof data === "object") {
    if ("message" in data && typeof data.message === "string") {
      return data.message;
    }
    if ("detail" in data && typeof data.detail === "string") {
      return data.detail;
    }
    if ("error" in data && typeof data.error === "string") {
      return data.error;
    }
  }

  // 3. 위 모든 경우에 해당하지 않으면, 전체를 문자열로 변환하여 디버깅을 도움
  return JSON.stringify(data);
}

/**
 * @function getRequest
 * @description 공통 GET 요청 함수
 * @returns {Promise<T>} API 응답 객체
 */
export async function getRequest<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(endpoint, config);
    const data = response.data;

    if (String(data.code).startsWith("2")) {
      return data.result;
    } else {
      throw new ApiError(data.message, response.status, data.code);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const status = error.response?.status;

      if (isApiErrorPayload(responseData)) {
        throw new ApiError(responseData.message, status, responseData.code, responseData.errors);
      } else {
        const message = extractApiErrorMessage(responseData);
        throw new ApiError(message, status);
      }
    }
    throw error;
  }
}

/**
 * @function postRequest
 * @description 공통 POST 요청 함수
 * @returns {Promise<T>} API 응답 객체
 */
export async function postRequest<T, B = unknown>(
  endpoint: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(endpoint, body, config);
    const data = response.data;

    if (String(data.code).startsWith("2")) {
      return data.result;
    } else {
      throw new ApiError(data.message, response.status, data.code);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const status = error.response?.status;

      if (isApiErrorPayload(responseData)) {
        throw new ApiError(responseData.message, status, responseData.code, responseData.errors);
      } else {
        const message = extractApiErrorMessage(responseData);
        throw new ApiError(message, status);
      }
    }
    throw error;
  }
}
