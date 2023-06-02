import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <h2>Welcome to Twitter Clone</h2>
      <span>Sign in to get started</span>
      <SignIn />
    </div>
  );
}
