"use client";

import Image from "next/image";
import * as s from "./Fab.css";

export interface FabProps {
  /** FAB 이미지 src */
  imageSrc?: string;
  /** FAB 이미지 alt */
  imageAlt?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 외부에서 주입할 클래스 */
  className?: string;
}

export function Fab({ imageSrc, imageAlt = "", onClick, className }: FabProps) {
  const combinedClassName = [s.root, className].filter(Boolean).join(" ");

  return (
    <button className={combinedClassName} onClick={onClick}>
      {imageSrc && <Image src={imageSrc} alt={imageAlt} width={60} height={60} />}
    </button>
  );
}
