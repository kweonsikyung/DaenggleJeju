/** @file /api/client.ts
 * @module /api/client
 * @description 프로젝트 전역에서 사용될 Axios 인스턴스를 생성하고 설정합니다.
 */
import axios, { type InternalAxiosRequestConfig } from "axios";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const isCsrfRequired = (method?: string): boolean => {
  const upperCaseMethod = (method || "GET").toUpperCase();
  return ["POST", "PUT", "PATCH", "DELETE"].includes(upperCaseMethod);
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined" && isCsrfRequired(config.method)) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers.set("X-CSRFToken", csrfToken);
    }
  }
  return config;
});

export default api;
