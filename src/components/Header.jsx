
// import Container from "@/components/ui/Container";
import HeaderLogo from "@/components/HeaderLogo";
// import { ToggleDarkLight } from "./ToggleDarkLight";
import Navigation from "./Navigation";
// import AccountSection from "@/components/AccountSection";
// import { getServerSession } from "next-auth/next";
// import { nextAuthOptions } from "@/lib/nextAuthOptions";
// import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  // const serverSession = await getServerSession(nextAuthOptions);

  return (
    <header className="  items-center mb-16 pt-8 z-50">
      <div className=" container relative grid grid-cols-header gap-4 h-16 items-center w-full">
        {/* <div className=" items-center lg:hidden">
          <MobileMenu />
        </div>
        <HeaderLogo /> */}
        <div className=" lg:flex lg:flex-grow ">
          <Navigation />
        </div>
        {/* <div className=" flex flex-auto justify-end items-center mr-10">
          <AccountSection />

        </div> */}
      </div>
    </header>
  );
}