"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/useModal.ts
var _react = require('react');
function useModal() {
  const [isOpen, setIsOpen] = _react.useState.call(void 0, false);
  const openModal = _react.useCallback.call(void 0, () => {
    setIsOpen(true);
  }, []);
  const closeModal = _react.useCallback.call(void 0, () => {
    setIsOpen(false);
  }, []);
  return {
    isOpen,
    openModal,
    closeModal
  };
}

// src/useWebShare.ts

var useWebShare = () => {
  const share = _react.useCallback.call(void 0, async (data) => {
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

function useTypingEffect(fullText, speed = 50) {
  const [typedText, setTypedText] = _react.useState.call(void 0, "");
  _react.useEffect.call(void 0, () => {
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




exports.useModal = useModal; exports.useTypingEffect = useTypingEffect; exports.useWebShare = useWebShare;
