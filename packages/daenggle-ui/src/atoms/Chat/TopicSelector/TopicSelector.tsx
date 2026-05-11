"use client";

import * as s from "./TopicSelector.css";

interface TopicSelectorProps {
  /** 버튼으로 표시할 주제 목록 (문자열 배열) */
  topics: string[];
  /** 특정 주제 버튼을 클릭했을 때 호출될 함수 */
  onSelectTopic: (topic: string) => void;
}

export function TopicSelector({ topics, onSelectTopic }: TopicSelectorProps) {
  return (
    <div className={s.container}>
      {topics.map((topic) => (
        <button key={topic} className={s.topicButton} onClick={() => onSelectTopic(topic)}>
          {topic}
        </button>
      ))}
    </div>
  );
}
