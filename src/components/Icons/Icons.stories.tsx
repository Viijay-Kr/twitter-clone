import type { Meta, StoryObj } from "@storybook/react";
import { BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { FiImage, FiMoreHorizontal } from "react-icons/fi";
import {
  AiOutlineRetweet,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMail,
} from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";

const placeHolder = () => null;
const meta: Meta<typeof placeHolder> = {
  title: "Icons",
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof placeHolder>;

export const Primary: Story = {
  render: () => {
    return (
      <div className="flex gap-[1rem]">
        <BsTwitter color="white" size={"32"} />
        <IoMdHome color="white" size={"32"} />
        <CgProfile color="white" size={"32"} />
        <AiOutlineMail color="white" size={"32"} />
        <BsBookmarkFill color="white" size={"32"} />
        <RiFileList2Line color="white" size={"32"} />
        <FiImage color="#1d9bf0" size={18} />
        <AiOutlineRetweet color="#71767b" size={18} />
        <FiMoreHorizontal color="71767b" size={"18"} />
        <AiOutlineHeart color="#71767b" size={18} />
        <AiFillHeart color="#f91880" size={18} />
        <BsBookmarkFill color="#1d9bf0" size={18} />
        <BsBookmark color="#71767b" size={18} />
      </div>
    );
  },
};
