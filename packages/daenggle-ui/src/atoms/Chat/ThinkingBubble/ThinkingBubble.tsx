"use client";

import * as s from "./ThinkingBubble.css";

export function ThinkingBubble() {
  return (
    <div className={s.wrapper}>
      <div className={s.bubble}>
        <div className={s.dot} style={{ animationDelay: "0s" }} />
        <div className={s.dot} style={{ animationDelay: "0.2s" }} />
        <div className={s.dot} style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}
