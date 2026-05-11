"use client";

import * as s from "./Pagination.css";

interface PaginationProps {
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={s.root} aria-label="페이지네이션">
      {pages.map((page) => (
        <button
          key={page}
          className={`${s.page} ${currentPage === page ? s.active : ""}`}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        />
      ))}
    </nav>
  );
}
