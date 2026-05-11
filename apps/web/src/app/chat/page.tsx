"use client";

//components
import {
  AiProfileHeader,
  ChatInput,
  MessageBox,
  NavBar,
  NoticeBox,
  ThinkingBubble,
  TopBar,
  TopicSelector,
} from "daenggle-ui";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/constants/navData";
import { usePostCareQuestion } from "@/hooks/api/useCare";
import { useNotice } from "@/hooks/useNotice";
//hooks
import { useTypingEffect } from "@/hooks/useTypingEffect";

//utils
import { Topic, travelCareData } from "./_util";
import * as s from "./style.css";

/** type */
const initialTopics = Object.keys(travelCareData) as Topic[];

// 모든 메시지 통합 관리
type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  content: string;
  options?: { text: string; isSubTopic?: boolean }[];
};

/**
 * AI 여행케어 페이지
 * * style/ page = topbar + container + nav(ai)
 */
export default function Page() {
  /** router */
  const router = useRouter();

  /** hooks */
  const {
    shouldRender: shouldNoticeRender,
    animation: noticeAnimation,
    hideNotice,
  } = useNotice(true);
  const { askQuestion, isAsking } = usePostCareQuestion();

  /** chat state */
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const typedAnswer = useTypingEffect(typingContent, 30);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 최초 진입 시 초기 메시지 설정
  useEffect(() => {
    setChatHistory([
      {
        id: "init-1",
        sender: "ai",
        content:
          "무엇이 궁금하신가요? 제주여행 중 반려견 건강 걱정은 AI 여행케어가 함께 덜어드릴게요. 먼저 아래에서 항목을 선택해 주세요.",
        options: initialTopics.map((topic) => ({ text: topic })),
      },
    ]);
  }, []);

  // 타이핑 효과가 끝나면 실제 대화 기록에 AI 메시지를 추가
  useEffect(() => {
    if (typingContent && typedAnswer.length === typingContent.length) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      if (lastMessage?.content !== typedAnswer) {
        setChatHistory((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            content: typedAnswer,
          },
        ]);
      }
      setTypingContent("");
    }
  }, [typedAnswer, typingContent, chatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /** event handlers */
  const handleOptionSelect = (optionText: string, isSubTopic: boolean = false) => {
    setChatHistory((prev) => [
      ...prev.map((msg) => ({ ...msg, options: undefined })),
      {
        id: `user-${Date.now()}`,
        sender: "user",
        content: optionText,
      },
    ]);

    setIsAiThinking(true);

    setTimeout(() => {
      setIsAiThinking(false);
      let aiResponse: ChatMessage;

      if (!isSubTopic) {
        // 메인 토픽 선택 시
        const conversation = travelCareData[optionText as Topic];
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          content: conversation.aiResponse,
          options: conversation.options.map((opt) => ({
            text: opt,
            isSubTopic: true,
          })),
        };
      } else {
        // 서브 토픽 선택 시
        const currentTopic = findCurrentTopic();
        if (currentTopic) {
          const conversation = travelCareData[currentTopic];
          aiResponse = {
            id: `ai-${Date.now()}`,
            sender: "ai",
            content: conversation.answers[optionText as keyof typeof conversation.answers],
            // 최종 답변 후에는 다시 초기 토픽을 보여줌
            options: initialTopics.map((topic) => ({ text: topic })),
          };
        } else {
          // 비상 상황
          aiResponse = {
            id: `err-${Date.now()}`,
            sender: "ai",
            content: "오류가 발생했습니다.",
          };
        }
      }
      setChatHistory((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const findCurrentTopic = (): Topic | null => {
    // 대화 기록을 역순으로 탐색하여 가장 최근의 메인 토픽을 찾음
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      const message = chatHistory[i];
      if (message.sender === "user" && initialTopics.includes(message.content as Topic)) {
        return message.content as Topic;
      }
    }
    return null;
  };

  const handleFreeFormSubmit = async (question: string) => {
    setChatHistory((prev) => [
      ...prev.map((msg) => ({ ...msg, options: undefined })),
      {
        id: `user-${Date.now()}`,
        sender: "user",
        content: question,
      },
    ]);

    try {
      const response = await askQuestion({ question });
      setTypingContent(response.message.markdown);
    } catch (_error) {
      setTypingContent(
        "죄송해요, 답변을 생성하는 데 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    }
  };

  const isInputDisabled = isAiThinking || isAsking || typingContent.length > 0;

  return (
    <div className={s.page}>
      <TopBar title={"AI 여행케어"} className={s.topBarWithBorder} />

      <div className={s.container}>
        <div className={s.notice_container}>
          <NoticeBox
            shouldRender={shouldNoticeRender}
            animation={noticeAnimation}
            onClose={hideNotice}
            variant="blue"
          >
            본 챗봇은 자동화된 정보 제공 시스템으로, 간혹 부정확하거나 불완전한 내용이 포함될 수
            있습니다. 제공되는 정보에 대해 본 서비스를 통해 책임을 지지 않으며, 최종 판단은 사용자가
            직접 확인 후 진행해 주시기 바랍니다.
          </NoticeBox>
        </div>

        {/* 통합된 대화 기록 렌더링 */}
        {chatHistory.map((message) => (
          <React.Fragment key={message.id}>
            {message.sender === "ai" && (
              <AiProfileHeader
                imageUrl="/assets/curation/avatar.svg"
                title="여행케어 AI"
                subtitle="빠르게 찾는 반려견 건강 정보"
              />
            )}
            <MessageBox variant={message.sender === "ai" ? "ai" : "user"}>
              {message.content}
            </MessageBox>
            {message.options && (
              <TopicSelector
                topics={message.options.map((opt) => opt.text)}
                onSelectTopic={(topic) =>
                  handleOptionSelect(topic, message.options?.[0].isSubTopic)
                }
              />
            )}
          </React.Fragment>
        ))}

        {/* 로딩 및 타이핑 UI */}
        {(isAiThinking || isAsking) && (
          <>
            <AiProfileHeader
              imageUrl="/assets/curation/avatar.svg"
              title="여행케어 AI"
              subtitle="빠르게 찾는 반려견 건강 정보"
            />
            <ThinkingBubble />
          </>
        )}
        {typedAnswer && (
          <>
            <AiProfileHeader
              imageUrl="/assets/curation/avatar.svg"
              title="여행케어 AI"
              subtitle="빠르게 찾는 반려견 건강 정보"
            />
            <MessageBox variant="ai">{typedAnswer}</MessageBox>
          </>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className={s.inputWrapper}>
        <ChatInput onSend={handleFreeFormSubmit} disabled={isInputDisabled} />
      </div>

      <NavBar activeId="ai" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
    </div>
  );
}
