import { fn } from "storybook/test";
import GameOverModal from "../components/GameOverModal";

const meta = {
  title: "Components/GameOverModal",
  component: GameOverModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    isFinal: false,
    timerMode: "none",
    onRestart: fn(),
    onNext: fn(),
    onMenu: fn(),
    onResults: fn(),
  },
  argTypes: {
    isFinal: { control: "boolean" },
    timerMode: {
      control: "radio",
      options: ["none", "limit"],
    },
    onRestart: { action: "restart" },
    onNext: { action: "next" },
    onMenu: { action: "menu" },
    onResults: { action: "results" },
  },
};

export default meta;

export const StandardCompletion = {
  args: {
    isFinal: false,
    timerMode: "none",
  },
};

export const TimedCompletion = {
  args: {
    isFinal: false,
    timerMode: "limit",
  },
};

export const FinalLevel = {
  args: {
    isFinal: true,
    timerMode: "none",
  },
};
