"use client";

import * as s from "./style.css";

/**
 * @component LoadingSpinner
 * @description 화면 전체를 덮는 반투명 오버레이에 로딩 스피너
 */
export const LoadingSpinner = () => {
  return (
    <div className={s.overlay}>
      <div className={s.spinner}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#00A63E"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="4">
              <circle strokeOpacity=".5" cx="24" cy="24" r="22" />
              <path d="M46 24c0-12.15-9.85-22-22-22">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 24 24"
                  to="360 24 24"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
