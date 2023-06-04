import Avatar from "../Avatar/Avatar";

interface IProps {
  user: {
    profilePic: string;
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
  };
  content: string;
  mediaUrl?: string;
  createdAt: Date | null;
}
export default function TweetCard(props: IProps) {
  return (
    <div className="flex flex-row gap-[0.5rem] border-b border-slate-800 px-[1rem] py-[0.5rem]">
      <Avatar
        src={props.user.profilePic}
        alt={props.user.userName ?? "anonymous"}
      />
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex flex-row items-baseline gap-[0.5rem]">
          <p className="text-lg font-semibold">{props.user.firstName}</p>
          <p className="text-md text-slate-400">@{props.user.userName}</p>
          {props.createdAt && (
            <p className="text-xs text-slate-400">
              {props.createdAt.toLocaleDateString("en-us", {
                day: "2-digit",
                hour: "numeric",
                month: "short",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <p className="text">{props.content}</p>
          {props.mediaUrl && (
            <img
              src={props.mediaUrl}
              alt="uploaded media"
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
