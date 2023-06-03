import classNames from "classnames";

interface IProps extends React.ComponentProps<"button"> {
  variant: "primary" | "secondary";
}
export default function Button(props: IProps) {
  return (
    <button
      {...props}
      className={classNames(
        "items-center rounded-full  text-center text-lg font-bold ",
        {
          ["bg-blue-500 hover:bg-blue-400"]: props.variant === "primary",
        },
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
