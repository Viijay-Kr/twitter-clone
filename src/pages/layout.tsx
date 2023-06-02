import { SignedIn } from "@clerk/nextjs";
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
        <div className="basis-[30%]">
          <SignedIn>
            <LeftNav />
          </SignedIn>
        </div>
        <div className="basis-[70%]">
          <main className="p-[2rem]">{props.children}</main>
        </div>
      </section>
      <footer></footer>
    </>
  );
}
