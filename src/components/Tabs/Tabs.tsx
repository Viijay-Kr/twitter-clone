"use client";

import classNames from "classnames";
import { useState } from "react";

interface IProps<T> {
  default: T;
  tabs: T[];
  children: (activeTab: T) => React.ReactNode;
}
export default function Tabs<T extends string>(props: IProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(props.default);

  return (
    <div className="flex flex-col">
      <div className="flex basis-[100%] flex-row items-center justify-between border-b border-slate-800">
        {props.tabs.map((t, index) => (
          <Tab
            onClick={() => {
              setActiveTab(t);
            }}
            active={activeTab === t}
            tab={t}
            key={index}
          />
        ))}
      </div>
      {props.children(activeTab)}
    </div>
  );
}

const Tab = (props: { tab: string; active: boolean; onClick: () => void }) => {
  return (
    <p
      className={classNames(
        "flex-1 cursor-pointer p-[1rem] text-center font-bold hover:bg-slate-900"
      )}
      onClick={props.onClick}
    >
      <span
        className={classNames({
          [" border-b-2 border-blue-500"]: !!props.active,
        })}
      >
        {props.tab}
      </span>
    </p>
  );
};
