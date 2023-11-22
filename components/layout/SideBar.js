"use client";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./modules/SideBarLogo";
import useCurrentUser from "@/hooks/useCurrentUser";
import SideBarItem from "./modules/SideBarItem";
import SideBarTweetButton from "./modules/SideBarTweetButton";
import { signOut } from "next-auth/react";
const SideBar = () => {
  const {data: currentUser } = useCurrentUser();
  //  console.log(currentUser)
  const items = [
    {
      lable: "home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      lable: "Notification",
      href: "/notification",
      icon: BsBellFill,
      auth:true
    },
    {
      lable: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth:true
    },
  ];
  return (
    <div className=" col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className=" space-y-2 lg:w-[250px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              lable={item.lable}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SideBarItem
              onClick={signOut}
              icon={BiLogOut}
              lable="Logout"
              href="/"
            />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
