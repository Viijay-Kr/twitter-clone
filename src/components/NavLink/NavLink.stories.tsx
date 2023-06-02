import type { Meta, StoryObj } from "@storybook/react";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "./NavLink";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NavLink> = {
  title: "Components/Navlink",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  component: NavLink,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Primary: Story = {
  args: {
    text: "Home",
    icon: <IoMdHome size={"32"} />,
    to: "/home",
  },
};
