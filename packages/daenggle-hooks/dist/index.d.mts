/**
 * 모달의 열림/닫힘 상태를 관리하는 커스텀 훅
 * @returns { isOpen: boolean, openModal: () => void, closeModal: () => void }
 */
declare function useModal(): {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

/**
 * Web Share API를 통해 공유할 데이터 타입
 */
type ShareData = {
    title?: string;
    text?: string;
    url?: string;
};
/**
 * Web Share API 또는 클립보드 복사 기능을 제공하는 커스텀 훅
 * @returns {share} - 공유 기능을 실행하는 함수
 */
declare const useWebShare: () => {
    share: (data: ShareData) => Promise<void>;
};

/**
 * 텍스트를 타이핑하는 것처럼 보여주는 효과를 위한 커스텀 훅
 * @param fullText - 최종적으로 표시할 전체 텍스트
 * @param speed - 타이핑 속도 (ms)
 */
declare function useTypingEffect(fullText: string, speed?: number): string;

export { type ShareData, useModal, useTypingEffect, useWebShare };
