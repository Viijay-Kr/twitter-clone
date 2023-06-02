import { SignedIn, useUser } from "@clerk/nextjs";
import LeftNav from "./layouts/LeftNav";
import { Inconsolata } from "next/font/google";
import classNames from "classnames";

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
          "flex items-center gap-0 p-[2rem]",
          inconsolata.className
        )}
      >
        <SignedIn>
          <div className="basis-[30%]">
            <LeftNav />
          </div>
        </SignedIn>

        <main
          className={classNames({
            ["basis-[70%]"]: !!user.isSignedIn,
            ["basis-[100%]"]: !user.isSignedIn,
          })}
        >
          {props.children}
        </main>
      </section>
      <footer></footer>
    </>
  );
}
