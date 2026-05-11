"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Drawer } from "vaul";
import * as s from "./BottomSheet.css";

type BottomSheetProps = {
  /** 패널 오픈 여부 */
  open: boolean;
  /** 패널 열림/닫힘 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 패널 헤더 타이틀 */
  title?: string;
  /** 패널 내부에 렌더링할 콘텐츠 */
  children: ReactNode;
};

export function BottomSheet({ open, onOpenChange, title, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className={s.overlay} onClick={() => onOpenChange(false)} />
        <Drawer.Content className={s.content}>
          <div className={s.handle} />

          <div className={s.header}>
            <Drawer.Title style={{ display: "none" }} />
            <div className={s.title}>{title}</div>
            <button
              type="button"
              aria-label="닫기"
              className={s.close}
              onClick={() => onOpenChange(false)}
            >
              <Image src="/assets/icon24/x_line.svg" alt="뒤로가기" width={24} height={24} />
            </button>
          </div>

          <div className={s.body}>{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
