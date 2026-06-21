"use client";

import { LoadingSpinner, LoginButton } from "daenggle-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDevLogin, useKakaoLogin } from "@/hooks/api/useAuth";
import { LOGIN_TYPE } from "@/types/loginType";
import * as s from "./style.css";

const LOGIN_CONFIG = [
  { type: LOGIN_TYPE.KAKAO, title: "Kakao로 시작하기" },
  // { type: LOGIN_TYPE.NAVER, title: "Naver로 시작하기" },
  // { type: LOGIN_TYPE.GOOGLE, title: "Google로 시작하기" },
];

/** 로그인 페이지 */
export default function Login() {
  /** router */
  const router = useRouter();
  const { devLogin, isLoggingIn } = useDevLogin();
  const { kakaoLogin } = useKakaoLogin();

  const handleGuestLogin = async () => {
    if (isLoggingIn) return;
    try {
      await devLogin();
      router.push("/curation");
    } catch (_error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <React.Fragment>
      {isLoggingIn && <LoadingSpinner />}
      <div className={s.page}>
        <Image
          src="/assets/logo/logo-colored.png"
          alt="댕글제주"
          width={270}
          height={94}
          priority
        />

        <div className={s.btns}>
          {LOGIN_CONFIG.map(({ type, title }) => (
            <LoginButton
              key={type}
              provider={type}
              title={title}
              iconSrc={`/assets/login/${type}.svg`}
              onClick={() => {
                if (type === LOGIN_TYPE.KAKAO) kakaoLogin();
              }}
            />
          ))}

          <div className={s.span} onClick={handleGuestLogin}>
            로그인 없이 둘러보기
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
