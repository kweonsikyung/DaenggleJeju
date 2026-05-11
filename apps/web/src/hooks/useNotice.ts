"use client";

import { useCallback, useEffect, useState } from "react";

const ANIMATION_DURATION = 400;

/**
 * NoticeBox 컴포넌트의 표시 및 애니메이션 상태를 관리하는 커스텀 훅
 * @param {boolean} initialState - 초기의 표시 상태 (기본값: true)
 */
export const useNotice = (initialState: boolean = true) => {
  const [shouldRender, setShouldRender] = useState(initialState);
  const [animation, setAnimation] = useState<"in" | "out" | "idle">(initialState ? "in" : "idle");

  const hideNotice = useCallback(() => {
    setAnimation("out");
  }, []);

  const showNotice = useCallback(() => {
    setShouldRender(true);
    setAnimation("in");
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (animation === "out") {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
        setAnimation("idle");
      }, ANIMATION_DURATION);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animation]);

  return { shouldRender, animation, showNotice, hideNotice };
};
