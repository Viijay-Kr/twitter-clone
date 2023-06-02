import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <h2>Welcome to Twitter Clone</h2>
      <span>Sign up to get started</span>
      <SignUp afterSignUpUrl={"/"} />
    </div>
  );
}
