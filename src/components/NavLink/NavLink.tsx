import Link from "next/link";

interface IProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}
export function NavLink(props: IProps) {
  return (
    <Link
      className="flex items-center gap-[1rem] rounded-3xl  p-[0.5rem] px-[0.75rem] hover:bg-slate-900"
      href={props.to}
    >
      {props.icon}
      <p className="text-lg font-semibold">{props.text}</p>
    </Link>
  );
}
