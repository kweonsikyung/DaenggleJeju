import { useCallback } from "react";

/**
 * Web Share API를 통해 공유할 데이터 타입
 */
export type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

/**
 * Web Share API 또는 클립보드 복사 기능을 제공하는 커스텀 훅
 * @returns {share} - 공유 기능을 실행하는 함수
 */
export const useWebShare = () => {
  const share = useCallback(async (data: ShareData) => {
    const { title, text, url } = data;
    // url이 제공되지 않으면 현재 페이지의 url을 사용
    const shareUrl = url || window.location.href;

    if (typeof navigator === "undefined") {
      return;
    }

    // Web Share API를 지원하는 경우
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
        }
      }
    } else {
      // Web Share API를 지원하지 않는 경우
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (_error) {
        alert("링크 복사에 실패했습니다.");
      }
    }
  }, []);

  return { share };
};
