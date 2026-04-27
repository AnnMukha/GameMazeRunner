import "../src/styles/globals.css";

function ensureModalRoot() {
  if (!document.getElementById("modal-root")) {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
}

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  decorators: [
    (Story) => {
      ensureModalRoot();
      return Story();
    },
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
