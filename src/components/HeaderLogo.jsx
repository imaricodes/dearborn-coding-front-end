

import { Link } from "react-router-dom";
// import FDTBirdLogo from "@/public/images/FDTBirdLogo";
// import TishLogo from "@/components/TishLogo";

const HeaderLogo = () => {
  return (
    <Link
      to="/"
      className="ml-4 hidden sm:ml-8 md:flex md:flex-auto md:items-center lg:ml-0"
    >
      <div className="relative hidden h-12 w-20 text-primary sm:block">
        {/* <TishLogo /> */}
      </div>
    </Link>
  );
};

export default HeaderLogo;
