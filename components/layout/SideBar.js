'use client'
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./modules/SideBarLogo";
import SideBarItem from "./modules/SideBarItem";
import SideBarTweetButton from "./modules/SideBarTweetButton";
const SideBar = () => {
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
    },
    {
      lable: "Profile",
      href: "/users/123",
      icon: FaUser,
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
            />
          ))}
          <SideBarItem onClick={()=>{}} icon={BiLogOut} lable="Logout" href="/"/>
          <SideBarTweetButton/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
