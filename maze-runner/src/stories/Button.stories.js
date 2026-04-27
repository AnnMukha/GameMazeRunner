import { fn } from "storybook/test";
import Button from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", minWidth: "280px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    icon: "🎮",
    text: "Start game",
    onClick: fn(),
  },
  argTypes: {
    icon: { control: "text" },
    text: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;

export const PrimaryAction = {
  args: {
    icon: "🎮",
    text: "Start game",
  },
};

export const Navigation = {
  args: {
    icon: "➡️",
    text: "Next level",
  },
};

export const IconOnly = {
  args: {
    icon: "⬆️",
    text: "",
  },
};
