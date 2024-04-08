import { ReactNode } from "react";
import Image from "next/image";
import BackGroundPage from "../../public/login_background.jpg";
import Logo from "../../public/netflix_logo.svg";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <div className="sm:flex">
        <Image
          src={BackGroundPage}
          alt="Background"
          priority
          fill
          style={{
            overflow: "hidden",
            zIndex: -10,
            opacity: "0.9",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="absolute left-4 top-4 md:left-10 md:top-6">
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={120}
          priority // to upload the image first
          // style={{
          //   position: "absolute",
          //   left: "3rem",
          //   top: "2rem",
          //   objectFit: "contain",
          // }}
          // className="absolute left-4 top-4 md:left-10 md:top-6 object-contain z-10"
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
