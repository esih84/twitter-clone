'use client'
import FollowBar from "./FollowBar";
import SideBar from "./SideBar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen bg-black">
        <SessionProvider>
        <div className=" container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full">
              <SideBar/>
            <div className=" col-span-3 lg:col-span-2 border-x border-neutral-800">
              {children}
            </div>
            <FollowBar/>
          </div>
        </div>
      </SessionProvider>

    </div>
  );
};

export default Layout;
