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
    <div className="fixed bottom-0 left-0 top-0 flex h-[100%] w-[30%] border border-slate-900 py-[1rem]">
      <div className="ml-auto flex w-1/2 flex-col items-start gap-[1rem] px-[0.5rem]">
        <ul className="flex flex-col gap-[1rem]">
          <li>
            <BsTwitter className="ml-[0.75rem]" color="white" size={"32"} />
          </li>
          <li>
            <NavLink to="/home" text="Home" icon={<IoMdHome size={"28"} />} />
          </li>
          <li>
            <NavLink
              to="/explore"
              text="Explore"
              icon={<BiHash size={"28"} />}
            />
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
        </ul>
        <Button className="mt-[1rem]" variant="primary">
          Tweet
        </Button>
        <UserButton
          afterSignOutUrl="/"
          showName
          appearance={{
            elements: {
              userButtonOuterIdentifier:
                "text-slate-100 font-bold text-lg order-2",
              avatarBox: "h-[48px] w-[48px]",
              userButtonBox: "flex gap-[1rem] mt-auto items-start",
              rootBox: "mt-auto",
            },
          }}
        />
      </div>
    </div>
  );
}
