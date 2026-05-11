"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "@storybook/test";
import { SearchField } from "./SearchField";

const meta = {
  title: "Input/SearchField",
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    onClear: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
  },
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1. 핵심 로직 검증
export const TEST: Story = {
  args: { placeholder: "검색어를 입력해보세요" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // 초기 상태 확인: 포커스가 없는 상태
    await expect(input).not.toHaveFocus();

    // 입력 동작 테스트: "애월" 타이핑
    await userEvent.type(input, "애월");
    await expect(input).toHaveValue("애월");
    await expect(args.onChange).toHaveBeenCalled();

    // 초기화 동작 테스트: 지우기 버튼 클릭
    const clearButton = canvas.getByRole("button");
    await userEvent.click(clearButton);

    // 최종 결과 확인: 값이 비워졌는지 검증
    await expect(input).toHaveValue("");
    await expect(args.onClear).toHaveBeenCalled();
  },
};

// 2. 기본 렌더링 확인 (Default)
export const Default: Story = {
  args: { placeholder: "제주 지역 또는 장소명 검색" },
};

// 3. Focus
export const Focused: Story = {
  args: { placeholder: "제주 지역 또는 장소명 검색" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);
  },
};

// 4. Filled
export const Filled: Story = {
  args: { placeholder: "제주 지역 또는 장소명 검색", defaultValue: "애월" },
};

// 5. 로딩 상태
export const Loading: Story = {
  args: {
    loading: true,
    defaultValue: "검색 중",
  },
};

// 6. 에러 및 유효성 검증
export const Error: Story = {
  args: {
    error: "존재하지 않는 지역입니다.",
    defaultValue: "서울",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMsg = canvas.getByText("존재하지 않는 지역입니다.");
    await expect(errorMsg).toBeInTheDocument();
  },
};
