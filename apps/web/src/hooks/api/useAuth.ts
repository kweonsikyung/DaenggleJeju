import { usePathname } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { postDevLogin, postDevLogout } from "@/api/auth";
import { ApiError } from "@/api/common";
import { GetMeRes, PostDevLoginRes } from "@/types/auth";

/**
 * @hook useUser
 * @description 현재 로그인된 사용자 정보를 관리하는 SWR 훅.
 * GET /auth/me API를 호출하여 사용자 정보를 가져옴
 * /login에서는 호출 안함
 * 이 훅의 데이터는 앱의 전역 로그인 상태로 사용됨
 */
export function useUser() {
  const pathname = usePathname();

  // API를 호출하지 않을 페이지 경로 목록
  const publicRoutes = ["/login"];
  const shouldFetch = !publicRoutes.includes(pathname);

  const { data, error, isLoading, mutate } = useSWR<GetMeRes, ApiError>(
    shouldFetch ? "/auth/me" : null
  );

  return {
    user: data,
    isLoggedIn: !!data,
    isLoading,
    error,
    mutateUser: mutate,
  };
}

/**
 * @hook useDevLogin
 * @description 개발용 로그인 SWR Mutation 훅
 */
export function useDevLogin() {
  const { mutateUser } = useUser();

  const { trigger, isMutating, error } = useSWRMutation<PostDevLoginRes, ApiError, string>(
    "/auth/dev-login", // Mutation Key
    () => postDevLogin(),
    {
      onSuccess: (data) => {
        mutateUser(data, false);
      },
    }
  );

  return {
    devLogin: trigger,
    isLoggingIn: isMutating,
    loginError: error,
  };
}

/**
 * @hook useDevLogout
 * @description 개발용 로그아웃 SWR Mutation 훅
 */
export function useDevLogout() {
  const { mutateUser } = useUser();

  const { trigger, isMutating, error } = useSWRMutation(
    "/auth/dev-logout", // Mutation Key
    () => postDevLogout(),
    {
      onSuccess: () => {
        mutateUser(undefined, false);
      },
    }
  );

  return {
    devLogout: trigger,
    isLoggingOut: isMutating,
    logoutError: error,
  };
}

/**
 * @hook useKakaoLogin
 * @description 카카오 로그인
 */
export function useKakaoLogin() {
  const kakaoLogin = () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (!api) {
      alert("환경설정 오류: API 주소가 없습니다.");
      return;
    }
    window.location.href = `${api}/auth/kakao/login`;
  };

  return { kakaoLogin };
}
