"use client";

export default function TextBox(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      onInput={(evt) => {
        const el = evt.target as HTMLTextAreaElement;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }}
      className="min-h-[100px] resize-none border-0 bg-transparent px-[1rem] outline-none placeholder:text-lg placeholder:text-slate-400"
      {...props}
    />
  );
}
