"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "daenggle_visited_regions";

/**
 * 로컬 스토리지에서 방문 기록을 안전하게 불러오는 헬퍼 함수
 */
function getVisitedFromStorage(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return new Set();
    }
    const parsedArray: string[] = JSON.parse(storedData);
    return new Set(parsedArray);
  } catch (_e) {
    return new Set();
  }
}

/**
 * @hook useVisitedRegions
 * @description 지역(contextId) 방문 기록을 로컬 스토리지로 관리하는 훅
 * @returns {object}
 * - visitedRegions: 방문한 contextId가 담긴 Set 객체
 * - markAsVisited: contextId를 방문 처리하는 함수
 */
export function useVisitedRegions() {
  const [visited, setVisited] = useState<Set<string>>(new Set());

  // 컴포넌트가 처음 마운트될 때 로컬 스토리지에서 방문 기록을 state로 불러옵니다.
  useEffect(() => {
    setVisited(getVisitedFromStorage());
  }, []);

  /**
   * contextId를 방문한 것으로 표시하고 로컬 스토리지에 저장하는 함수
   */
  const markAsVisited = useCallback((contextId: string) => {
    setVisited((prevSet) => {
      // 이미 방문했으면 아무것도 안 함
      if (prevSet.has(contextId)) {
        return prevSet;
      }

      const newSet = new Set(prevSet);
      newSet.add(contextId);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
      } catch (_e) {}

      return newSet;
    });
  }, []);

  return { visitedRegions: visited, markAsVisited };
}
