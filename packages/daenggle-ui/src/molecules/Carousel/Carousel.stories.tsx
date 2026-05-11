import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Carousel } from "./Carousel";

const generateItems = (count: number, width: number = 200) => {
  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={{
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#666",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={`https://placehold.co/${width}x200?text=Item+${i + 1}`}
        alt={`Item ${i + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  ));
};

const meta = {
  title: "Molecules/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    gap: { control: "number", description: "아이템 간의 간격 (px)" },
    itemHeight: { control: "number", description: "아이템의 높이 (px)" },
    itemWidth: { control: "number", description: "아이템의 너비 (px)" },
    loop: { control: "boolean", description: "캐러셀 반복 여부" },
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: generateItems(10, 150),
    gap: 16,
    itemWidth: 150,
    itemHeight: 200,
    loop: false,
  },
};

export const WithCustomHeight: Story = {
  args: {
    children: generateItems(8, 200),
    gap: 10,
    itemHeight: 250,
    loop: false,
  },
};

export const Looping: Story = {
  args: {
    children: generateItems(5, 150),
    gap: 16,
    itemWidth: 150,
    itemHeight: 200,
    loop: true,
  },
};
