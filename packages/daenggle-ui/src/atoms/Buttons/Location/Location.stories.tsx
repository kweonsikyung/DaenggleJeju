import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { fn } from "storybook/test";
import { Location } from "./Location";

const meta = {
  title: "Button/Location",
  component: Location,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    desc: { control: "text" },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    title: "기본 타이틀",
    desc: "기본 설명",
    onClick: fn(),
  },
} satisfies Meta<typeof Location>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "제주 전체",
    desc: "제주 전지역",
    selected: false,
    disabled: false,
  },
};

export const Selected: Story = {
  args: {
    title: "제주시(도심)",
    desc: "공항·쇼핑·맛집·야경",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "안덕/대정",
    desc: "산방산·해안·마라도",
    disabled: true,
  },
};

export const GridSelectable: Story = {
  args: {},
  render: () => {
    const items = [
      { id: 1, title: "제주 전체", desc: "제주 전지역" },
      { id: 2, title: "제주시(도심)", desc: "공항·쇼핑·맛집·야경" },
      { id: 3, title: "애월/한림/한경", desc: "바다·카페·노을" },
      { id: 4, title: "조천/구좌/우도", desc: "해변·자연·드라이브" },
      { id: 5, title: "서귀포시(중문)", desc: "리조트·폭포·올레길" },
      { id: 6, title: "성산/표선/남원", desc: "일출·해변·해녀" },
      { id: 7, title: "안덕/대정", desc: "산방산·해안·마라도" },
    ];

    const [selected, setSelected] = useState<number[]>([1]);

    const toggle = (id: number) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          width: 375,
        }}
      >
        {items.map((it) => (
          <Location
            key={it.id}
            title={it.title}
            desc={it.desc}
            selected={selected.includes(it.id)}
            onClick={() => toggle(it.id)}
          />
        ))}
      </div>
    );
  },
};
