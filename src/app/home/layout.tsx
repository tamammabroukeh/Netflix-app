import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(options);
  if (!session) return redirect("/login");
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
};

export default HomeLayout;
