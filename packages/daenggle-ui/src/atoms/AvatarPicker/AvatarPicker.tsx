"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import * as s from "./AvatarPicker.css";

export interface AvatarPickerProps {
  /** 원형 아바타 지름(px). 기본 94 */
  size?: number;
  /** 미리보기 이미지 src (컨트롤드) */
  value?: string | null;
  /** 미리보기 초기값 (언컨트롤드) */
  defaultValue?: string | null;
  /** 파일 선택 시 호출: 원본 File, 미리보기 URL(Blob) 반환 */
  onChange?: (file: File, previewUrl: string) => void;
  /** input accept. 기본: image/* */
  accept?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 className */
  className?: string;
  /** 기본 아바타 이미지 src (미리보기 없을 때 표시) */
  placeholderImageSrc?: string;
  /** 카메라 버튼 아이콘 src */
  cameraIconSrc?: string;
}

export function AvatarPicker({
  size = 94,
  value,
  defaultValue = null,
  onChange,
  accept = "image/*",
  disabled,
  className,
  placeholderImageSrc,
  cameraIconSrc,
}: AvatarPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  // 언컨트롤드용 내부 URL
  const [innerUrl, setInnerUrl] = useState<string | null>(defaultValue);

  // 실제 표시할 url
  const previewUrl = value ?? innerUrl ?? null;

  // Blob URL 메모리 해제
  useEffect(() => {
    return () => {
      if (innerUrl) URL.revokeObjectURL(innerUrl);
    };
  }, [innerUrl]);

  const openPicker = () => {
    if (disabled) return;
    fileRef.current?.click();
  };

  const handlePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    // 언컨트롤드일 때만 내부 상태 보관
    if (value === undefined) {
      if (innerUrl) URL.revokeObjectURL(innerUrl);
      setInnerUrl(url);
    }

    onChange?.(file, url);

    // 같은 파일 다시 선택 가능하도록 초기화
    e.currentTarget.value = "";
  };

  return (
    <div
      className={[s.wrapper, className].filter(Boolean).join(" ")}
      style={{ width: size, height: size }}
      aria-label="아바타 선택"
    >
      {/* 이미지 영역 */}
      {previewUrl ? (
        <img src={previewUrl} alt={"아바타"} className={s.avatarImg} />
      ) : placeholderImageSrc ? (
        <Image
          src={placeholderImageSrc}
          alt=""
          width={size}
          height={size}
          className={s.avatarImg}
          priority
        />
      ) : null}

      {/* 숨김 파일 입력 */}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className={s.visuallyHidden}
        onChange={handlePick}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* 카메라 버튼 */}
      <div className={s.cameraBtn} onClick={openPicker} aria-label="아바타 변경">
        {cameraIconSrc && <Image src={cameraIconSrc} alt="" width={28} height={28} />}
      </div>
    </div>
  );
}
