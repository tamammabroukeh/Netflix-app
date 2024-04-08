"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/netflix_logo.svg";
import { links } from "@/data/data";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const renderLinks = () => {
    return links.map((link) => (
      <li key={link.id}>
        <Link
          className={`${
            pathname === link.href
              ? "text-white font-semibold underline"
              : "text-gray-400 font-normal"
          } text-md`}
          href={link.href}
        >
          {link.name}
        </Link>
      </li>
    ));
  };
  return (
    <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8">
      <div className="flex items-center">
        <Link href={"/home"}>
          <Image src={Logo} className="w-32" alt="Netflix logo" priority />
        </Link>
        <ul className="lg:flex ml-14 gap-x-4 hidden">{renderLinks()}</ul>
      </div>
      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer text-gray-400" />
        {/* <UserNav /> */}
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </nav>
  );
};

export default Navbar;
