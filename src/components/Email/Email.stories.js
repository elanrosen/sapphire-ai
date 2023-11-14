import { Email } from ".";

export default {
  title: "Components/Email",
  component: Email,
  argTypes: {
    style: {
      options: ["round", "sharp", "filled", "two-tone", "outlined"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    style: "round",
    className: {},
    styleOutlined: "/img/style-outlined-2.png",
  },
};
