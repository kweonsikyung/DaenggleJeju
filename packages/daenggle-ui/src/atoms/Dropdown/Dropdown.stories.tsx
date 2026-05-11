import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dropdown, DropdownOption } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "100%",
          backgroundColor: "#1E1E1E",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  argTypes: {
    options: {
      control: "object",
      description: "드롭다운에 표시될 옵션 목록",
    },
    selectedValue: {
      control: "text",
      description: "현재 선택된 옵션의 value",
    },
    onSelect: {
      action: "selected",
      description: "옵션 선택 시 호출되는 콜백 함수",
    },
    placeholder: {
      control: "text",
      description: "선택된 값이 없을 때 표시될 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const jejuRegions: DropdownOption[] = [
  { value: "PLACE_jeju_si", label: "제주시(도심)" },
  { value: "PLACE_aeweol", label: "애월/한림/한경" },
  { value: "PLACE_jocheon", label: "조천/구좌/우도" },
  { value: "PLACE_seogwipo_si", label: "서귀포시(도심)" },
  { value: "PLACE_andeok", label: "안덕/대정" },
  { value: "PLACE_seongsan", label: "성산/표선/남원" },
];

/**
 * 기본 상태의 드롭다운입니다. `useState`를 통해 인터랙티브하게 동작합니다.
 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>("PLACE_jeju_si");
    return (
      <Dropdown
        options={jejuRegions}
        selectedValue={selected}
        onSelect={setSelected}
        placeholder="지역 선택"
      />
    );
  },
};

/**
 * 아무것도 선택되지 않았을 때 `placeholder`가 표시되는 상태의 드롭다운입니다.
 */
export const WithPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <Dropdown
        options={jejuRegions}
        selectedValue={selected}
        onSelect={setSelected}
        placeholder="지역을 선택해주세요"
      />
    );
  },
};
