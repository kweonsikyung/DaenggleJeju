"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { FilterSection } from "./FilterSection";
import React, { useState } from "react";

const meta = {
  title: "Molecules/FilterSection",
  component: FilterSection,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "반려견 크기",
    multiSelect: true,
    chips: [
      { id: "s1", title: "소형견", caption: "10kg 미만" },
      { id: "s2", title: "중형견", caption: "10~24kg" },
      { id: "s3", title: "대형견", caption: "25~44kg" },
      { id: "s4", title: "초대형견", caption: "45kg 이상" },
      { id: "s5", title: "모든 크기", caption: "(소형~초대형 모두)" },
    ],
  },
  tags: ["autodocs"],
  argTypes: {
    multiSelect: { control: "boolean" },
    onChipClick: { action: "onChipClick" },
    selectedChips: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

const InteractiveFilterSection = (args: React.ComponentProps<typeof FilterSection>) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (chipId: string) => {
    setSelectedChips((prevSelected) => {
      if (args.multiSelect) {
        if (prevSelected.includes(chipId)) {
          return prevSelected.filter((id) => id !== chipId);
        } else {
          return [...prevSelected, chipId];
        }
      } else {
        return prevSelected.includes(chipId) ? [] : [chipId];
      }
    });
    args.onChipClick?.(chipId);
  };

  return <FilterSection {...args} selectedChips={selectedChips} onChipClick={handleChipClick} />;
};

export const Default: Story = {
  render: InteractiveFilterSection,
  args: {
    title: "반려견 크기",
    multiSelect: true,
    chips: [
      { id: "s1", title: "소형견", caption: "10kg 미만" },
      { id: "s2", title: "중형견", caption: "10~24kg" },
      { id: "s3", title: "대형견", caption: "25~44kg" },
      { id: "s4", title: "초대형견", caption: "45kg 이상" },
      { id: "s5", title: "모든 크기", caption: "(소형~초대형 모두)" },
    ],
    selectedChips: [],
    onChipClick: fn(),
  },
};
