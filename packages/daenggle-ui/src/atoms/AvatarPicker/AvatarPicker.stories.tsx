import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { AvatarPicker } from "./AvatarPicker";

const meta = {
  title: "Input/AvatarPicker",
  component: AvatarPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof AvatarPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  render: (args) => <AvatarPicker {...args} />,
};

export const Controlled: Story = {
  render: (args) => {
    const [src, setSrc] = useState<string | null>(null);
    return <AvatarPicker {...args} value={src} onChange={(_, url) => setSrc(url)} />;
  },
};
