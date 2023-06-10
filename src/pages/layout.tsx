import { SignedIn, useUser } from "@clerk/nextjs";
import LeftNav from "./layouts/LeftNav";
import { Inconsolata } from "next/font/google";
import classNames from "classnames";
import RightNav from "./layouts/RightNav";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Layout(props: React.PropsWithChildren) {
  const user = useUser();
  return (
    <>
      <section
        className={classNames(
          "flex items-center gap-0 p-[1rem]",
          inconsolata.className
        )}
      >
        <SignedIn>
          <div className="basis-[25%]">
            <LeftNav />
          </div>
        </SignedIn>

        <main
          className={classNames(
            "ml-[4.5%] min-h-screen border-r border-slate-800",
            {
              ["basis-[40%]"]: !!user.isSignedIn,
              ["basis-[100%]"]: !user.isSignedIn,
            }
          )}
        >
          {props.children}
        </main>
        <SignedIn>
          <div className="basis-[25%] border-l border-slate-800">
            <RightNav />
          </div>
        </SignedIn>
      </section>
      <footer></footer>
    </>
  );
}
