"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import * as s from "./Modal.css";

export interface ModalProps {
  /** 모달의 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 모달 내부에 표시될 컨텐츠 */
  children: ReactNode;
  /** 모달 제목 (옵션) */
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  // 백드롭 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modalContainer}>
        <div className={s.modalHeader}>
          {title && <h2 className={s.modalTitle}>{title}</h2>}
          <button className={s.closeButton} onClick={onClose} aria-label="닫기">
            <Image src="/assets/icon24/x_line.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>
        <div className={s.modalContent}>{children}</div>
      </div>
    </div>
  );
}
