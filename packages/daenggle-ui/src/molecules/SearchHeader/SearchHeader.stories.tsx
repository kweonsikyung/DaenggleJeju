"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SearchHeader } from "./SearchHeader";

const meta = {
  title: "Molecules/SearchHeader",
  component: SearchHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    searchFieldProps: {
      placeholder: "제주 지역 또는 장소명 검색",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    backIconHandler: undefined,
  },
};

export const WithBackButton: Story = {
  args: {
    backIconHandler: fn(),
  },
};

export const BackButtonWhite: Story = {
  args: {
    backIconHandler: fn(),
    backIconColor: "white",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#333" }],
    },
  },
};
