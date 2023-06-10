import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";

interface IProps {
  firstName: string;
  userName: string;
  profilePic: string;
  isFollowed: boolean;
  onFollowToggle: () => void;
}
export default function User(props: IProps) {
  return (
    <div className="flex flex-1 flex-row items-center gap-[0.5rem]">
      <Avatar src={props.profilePic} alt={props.userName} />
      <div className="flex flex-col">
        <p className="text-md">{props.firstName}</p>
        <p className="text-sm">{props.userName}</p>
      </div>
      <Button
        className="ml-auto p-[0.25rem] px-[0.5rem] text-sm"
        variant={props.isFollowed ? "primary" : "secondary"}
        onClick={props.onFollowToggle}
      >
        {props.isFollowed ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
