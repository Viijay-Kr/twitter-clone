import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Layout(props: React.PropsWithChildren) {
  return (
    <>
      <header>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
      <main className="p-[2rem]">{props.children}</main>
      <footer></footer>
    </>
  );
}
