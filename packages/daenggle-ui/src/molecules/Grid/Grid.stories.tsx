import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Grid } from "./Grid";

const generateGridItems = (count: number) => {
  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff"];

  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={{
        height: "150px",
        width: "100%",
        backgroundColor: colors[i % colors.length],
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "#333",
        fontWeight: "bold",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      Item {i + 1}
    </div>
  ));
};

const meta = {
  title: "Molecules/Grid",
  component: Grid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: generateGridItems(12),
  },
};
