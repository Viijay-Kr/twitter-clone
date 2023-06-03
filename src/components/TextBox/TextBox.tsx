/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";

const TextBox = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithRef<"textarea">
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      onInput={(evt) => {
        const el = evt.target as HTMLTextAreaElement;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }}
      className="resize-none border-0 bg-transparent px-[1rem] outline-none placeholder:text-lg placeholder:text-slate-400"
      {...props}
    />
  );
});

export default TextBox;
