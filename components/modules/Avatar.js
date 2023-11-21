"use client";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
const Avatar = ({ userId, isLarge = false, hasBorder = false }) => {
  const router = useRouter();
  const { data: fetchUser } = useUser(userId);
  const clickHandler = useCallback(
    (e) => {
      e.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? " border-4 border-black" : ""}
        ${isLarge ? " h-32" : "h-12"}
        ${isLarge ? " w-32" : "w-12"}
        rounded-full hover:opacity-90
         transition cursor-pointer relative
        `}
    >
      <Image fill priority style={{
        objectFit: "cover",
        borderRadius: "100%"
      }}
      alt="Avatar"
      onClick={ clickHandler}
      src={fetchUser?.profileImage || '/images/next.svg'}
       />
    </div>
  );
};

export default Avatar;
