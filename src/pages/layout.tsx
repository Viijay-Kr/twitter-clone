import { SignedIn, UserButton } from "@clerk/nextjs";
import LeftNav from "./layouts/LeftNav";
import { Inconsolata } from "next/font/google";
import classNames from "classnames";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Layout(props: React.PropsWithChildren) {
  return (
    <>
      <section className={classNames("flex gap-0", inconsolata.className)}>
        <SignedIn>
          <div className="fixed bottom-0 left-0 top-0 flex h-[100%]  w-[30%] border border-slate-900 py-[1rem]">
            <div className="ml-auto flex w-1/2 flex-col items-start gap-[1rem]">
              <LeftNav />
            </div>
          </div>
        </SignedIn>
        <div className="w-[70%]">
          <main className="p-[2rem]">{props.children}</main>
        </div>
      </section>
      <footer></footer>
    </>
  );
}
