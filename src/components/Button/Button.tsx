import classNames from "classnames";

interface IProps extends React.ComponentProps<"button"> {
  variant: "primary" | "secondary";
}
export default function Button(props: IProps) {
  return (
    <button
      className={classNames(
        "w-full items-center rounded-full p-[1rem] text-center text-lg font-bold",
        {
          ["bg-blue-500"]: props.variant === "primary",
        },
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
