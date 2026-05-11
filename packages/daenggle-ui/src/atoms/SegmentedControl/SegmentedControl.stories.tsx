import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SegmentedControl, SegmentedControlOption } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Common/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object", description: "탭 옵션 목록" },
    activeOption: { control: "text", description: "활성화된 탭의 id" },
    onSelect: { action: "selected", description: "탭 선택 시 호출되는 함수" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const mockOptions: SegmentedControlOption[] = [
  { id: "saved", label: "저장" },
  { id: "certified", label: "발자국 인증" },
];

const mockOptionsLong: SegmentedControlOption[] = [
  { id: "option1", label: "첫번째" },
  { id: "option2", label: "두번째" },
  { id: "option3", label: "세번째" },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("saved");
    return <SegmentedControl options={mockOptions} activeOption={active} onSelect={setActive} />;
  },
};

export const LongLabels: Story = {
  render: () => {
    const [active, setActive] = useState("option1");
    return (
      <SegmentedControl options={mockOptionsLong} activeOption={active} onSelect={setActive} />
    );
  },
  name: "3 options",
};
