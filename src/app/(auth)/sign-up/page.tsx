import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import GithubSignInButton from "@/app/components/GithubSignInButton";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
const SignUpPage = async () => {
  const session = await getServerSession(options);
  if (session) return redirect("/home");
  return (
    <div className="mt-24 bg-black/80 py-10 px-6 rounded md:max-w-m md:px-14 md:mt-0">
      <form method="post" action="/api/auth/signin">
        <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button
            className="w-full bg-[#e50914]"
            type="submit"
            variant="destructive"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <div className="text-gray-500 text-sm mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-white">
          Login now!
        </Link>
      </div>
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
};
export default SignUpPage;
