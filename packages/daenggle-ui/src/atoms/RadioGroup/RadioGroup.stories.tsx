import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    selectedValue: { control: "text" },
    onSelect: { action: "selected" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "375px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sampleOptions = [
  { value: "yes", label: "동반 출입 가능" },
  { value: "no", label: "동반 출입 불가능" },
  { value: "conditional", label: "상세 입력" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>("yes");
    return (
      <RadioGroup
        label="출입 가능 여부"
        options={sampleOptions}
        selectedValue={selected}
        onSelect={setSelected}
      />
    );
  },
};
