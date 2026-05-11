"use client";

import Image from "next/image";
import React, { useState } from "react";
import * as s from "./style.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <input
          className={s.input}
          placeholder={disabled ? "AI가 답변 중입니다" : "궁금한 내용을 질문해보세요"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          className={s.sendButton}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="전송"
        >
          <Image src="/assets/icon24/send.svg" alt="전송" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
