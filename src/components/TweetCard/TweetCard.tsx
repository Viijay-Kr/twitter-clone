import Avatar from "../Avatar/Avatar";

interface IProps {
  user: {
    profilePic: string;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
  };
  content: string;
}
export default function TweetCard(props: IProps) {
  return (
    <div className="flex flex-row gap-[0.5rem] border-b border-slate-800 px-[1rem] py-[0.5rem]">
      <div className="">
        <Avatar
          src={props.user.profilePic}
          alt={props.user.userName ?? "anonymous"}
        />
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex flex-row items-center gap-[0.25rem]">
          <p className="text-lg font-semibold">{props.user.firstName}</p>
          <p className="text-sm text-slate-400">@{props.user.userName}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <p className="text">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
