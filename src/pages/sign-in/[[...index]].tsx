import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <h2 className="text-3xl font-bold">Welcome to Twitter Clone</h2>
      <span className="text-left text-sm text-slate-200">
        Sign in to get started
      </span>
      <SignIn />
    </div>
  );
}
