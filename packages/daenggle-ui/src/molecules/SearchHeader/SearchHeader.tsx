"use client";

import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { SearchField } from "../../atoms/SearchField/SearchField";
import * as s from "./SearchHeader.css";

export interface SearchHeaderProps {
  /** back 아이콘 핸들러: 주면 자동으로 아이콘 노출 + 핸들러 등록 */
  backIconHandler?: () => void;
  /** back 아이콘 색상 */
  backIconColor?: "black" | "white";
  /** SearchField의 props */
  searchFieldProps?: React.ComponentProps<typeof SearchField>;
  /** 클릭 핸들러: 전달하면 SearchField가 버튼처럼 동작 */
  onClick?: () => void;
}

export function SearchHeader({
  backIconHandler,
  backIconColor = "black",
  searchFieldProps,
  onClick,
}: SearchHeaderProps) {
  return (
    <div className={s.root}>
      {backIconHandler && (
        <button className={s.backButton} onClick={backIconHandler}>
          <RiArrowLeftLine size={24} color={backIconColor === "white" ? "#ffffff" : "#525252"} />
        </button>
      )}
      <div className={s.searchFieldWrapper[backIconHandler ? "withBackButton" : "fullWidth"]}>
        <SearchField {...searchFieldProps} readOnly={!!onClick} />
        {onClick && <div className={s.clickOverlay} onClick={onClick} />}
      </div>
    </div>
  );
}
