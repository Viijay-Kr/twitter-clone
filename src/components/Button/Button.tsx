import classNames from "classnames";

interface IProps extends React.ComponentProps<"button"> {
  variant: "primary" | "secondary";
}
export default function Button(props: IProps) {
  return (
    <button
      {...props}
      className={classNames(
        "items-center rounded-full text-center text-lg font-bold ",
        {
          ["bg-blue-500 hover:bg-blue-400"]: props.variant === "primary",
          ["bg-slate-200 text-slate-900 hover:bg-slate-100"]:
            props.variant === "secondary",
        },
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
