/**
 * @file utils/interaction.ts
 * @description 사용자의 브라우저 기능(클립보드, 전화)과 상호작용하는 유틸 함수
 */

/**
 * 텍스트를 사용자의 클립보드에 복사
 * - HTTPS 환경에서는 Clipboard API
 * -  HTTP 환경에서는 execCommand 폴백
 * @param text 복사할 텍스트
 * @param alertMessage 복사 성공 시 띄울 알림 메시지
 */
export const copyToClipboard = (
  text: string | null | undefined,
  alertMessage = "클립보드에 복사되었습니다."
) => {
  if (!text) {
    alert("복사할 내용이 없습니다.");
    return;
  }

  // 1. Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(alertMessage);
      })
      .catch((err) => {
        alert("복사에 실패했습니다.");
      });
  } else {
    // 2. execCommand
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";

      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      alert(alertMessage);
    } catch (_err) {
      alert("복사에 실패했습니다.");
    }
  }
};

/**
 * 모바일 기기에서 전화 앱 실행
 * @param phoneNumber 전화번호 (e.g., "010-1234-5678" 또는 "0647123456")
 */
export const callPhoneNumber = (phoneNumber: string | null | undefined) => {
  if (!phoneNumber) {
    alert("전화번호 정보가 없습니다.");
    return;
  }

  const cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
  window.location.href = `tel:${cleanedNumber}`;
};
