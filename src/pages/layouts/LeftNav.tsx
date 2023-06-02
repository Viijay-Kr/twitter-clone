import { AiOutlineMail } from "react-icons/ai";
import { BsBookmarkFill, BsBellFill, BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { RiFileList2Line } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { NavLink } from "~/components/NavLink/NavLink";
import Button from "~/components/Button/Button";
import { UserButton } from "@clerk/clerk-react";

export default function LeftNav() {
  return (
    <ul className="flex min-h-screen flex-col gap-[1rem]">
      <li>
        <BsTwitter className="ml-[0.75rem]" color="white" size={"32"} />
      </li>
      <li>
        <NavLink to="/home" text="Home" icon={<IoMdHome size={"28"} />} />
      </li>
      <li>
        <NavLink to="/explore" text="Explore" icon={<BiHash size={"28"} />} />
      </li>
      <li>
        <NavLink
          to="/notifications"
          text="Notifications"
          icon={<BsBellFill size={"28"} />}
        />
      </li>
      <li>
        <NavLink
          to="/messages"
          text="Messages"
          icon={<AiOutlineMail color="white" size={"28"} />}
        />
      </li>
      <li>
        <NavLink
          to="/lists"
          text="Lists"
          icon={<RiFileList2Line color="white" size={"28"} />}
        />
      </li>
      <li>
        <NavLink
          to="/bookmarks"
          text="Bookmarks"
          icon={<BsBookmarkFill color="white" size={"28"} />}
        />
      </li>
      <li>
        <NavLink
          to="/profile"
          text="Profile"
          icon={<CgProfile color="white" size={"28"} />}
        />
      </li>
      <li>
        <Button variant="primary">Tweet</Button>
      </li>
      <li className="mb-[3rem] mt-auto">
        <UserButton
          afterSignOutUrl="/"
          showName
          appearance={{
            elements: {
              userButtonOuterIdentifier:
                "text-slate-100 font-bold text-lg order-2",
              avatarBox: "h-[48px] w-[48px]",
              userButtonBox: "flex gap-[1rem] items-start",
            },
          }}
        />
      </li>
    </ul>
  );
}
