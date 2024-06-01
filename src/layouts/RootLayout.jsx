import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

import Header from "@/components/Header";

const RootLayout = () => {

  return (
    <div className="root-layout h-screen">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default RootLayout;
