// src/useModal.ts
import { useCallback, useState } from "react";
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  return {
    isOpen,
    openModal,
    closeModal
  };
}

// src/useWebShare.ts
import { useCallback as useCallback2 } from "react";
var useWebShare = () => {
  const share = useCallback2(async (data) => {
    const { title, text, url } = data;
    const shareUrl = url || window.location.href;
    if (typeof navigator === "undefined") {
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("\uB9C1\uD06C\uAC00 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
      } catch (_error) {
        alert("\uB9C1\uD06C \uBCF5\uC0AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }
  }, []);
  return { share };
};

// src/useTypingEffect.ts
import { useEffect, useState as useState2 } from "react";
function useTypingEffect(fullText, speed = 50) {
  const [typedText, setTypedText] = useState2("");
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
export {
  useModal,
  useTypingEffect,
  useWebShare
};
