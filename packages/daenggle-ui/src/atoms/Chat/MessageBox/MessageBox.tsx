"use client";

import React from "react";
import * as s from "./MessageBox.css";

interface MessageBoxProps {
  children: React.ReactNode;
  /** 메시지 주체 ('ai' 또는 'user') */
  variant?: "ai" | "user";
}

export function MessageBox({ children, variant = "ai" }: MessageBoxProps) {
  const messageClass = variant === "user" ? s.userMessageBox : s.aiMessageBox;

  return (
    <div className={s.wrapper}>
      <div className={messageClass}>{children}</div>
    </div>
  );
}
