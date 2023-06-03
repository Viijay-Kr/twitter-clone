/* eslint-disable @next/next/no-img-element */

export default function Avatar(props: React.ComponentProps<"img">) {
  return (
    <img
      className="h-[48px] w-[48px] rounded-full"
      src={props.src}
      alt={props.alt}
    />
  );
}
