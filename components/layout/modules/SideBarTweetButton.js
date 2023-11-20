"use client";

import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";

const SideBarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal()
  const clickHandler = useCallback(() => {

    loginModal.onOpen();
  }, [loginModal]);
  
  return (
    <div onClick={clickHandler}>
      <div className=" mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className=" mt-6 hidden lg:block rounded-full  px-4 py-2   bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className=" hidden lg:block text-center font-semibold text-[20px]">Tweet</p>
      </div>
    </div>
  );
};

export default SideBarTweetButton;
