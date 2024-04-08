import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(options);
  if (session) return redirect("/home");
  else return redirect("/login");

  return (
    <div>
      Hello
      {session?.user?.email}
    </div>
  );
}
