"use client";

import { useEffect, useState } from "react";

/**
 * 텍스트를 타이핑하는 것처럼 보여주는 효과를 위한 커스텀 훅
 * @param fullText - 최종적으로 표시할 전체 텍스트
 * @param speed - 타이핑 속도 (ms)
 */
export function useTypingEffect(fullText: string, speed = 50) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    setTypedText("");

    if (fullText) {
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
        if (i >= fullText.length) {
          clearInterval(intervalId);
        }
      }, speed);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fullText, speed]);

  return typedText;
}
