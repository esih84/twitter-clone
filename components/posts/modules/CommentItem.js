"use client";
import Avatar from "@/components/modules/Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiOutlineMessage } from "react-icons/ai";

const CommentItem = ({ data }) => {
  const router = useRouter();
  const goToUser = useCallback(
    (e) => {
      e.stopPropagation();
      router.push(`/users/${data.userId}`);
    },
    [router, data.userId]
  );
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  return (
    <div
      className=" 
    border-b 
    border-neutral-800
    p-5
    cursor-pointer
    hover:bg-neutral-900
    transition
    "
    >
      <div className=" flex flex-row items-start gap-3">
        <Avatar userId={data.userId} />
        <div>
          <div className=" flex flex-row items-center gap-2 ">
            <p
              onClick={goToUser}
              className=" text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              className="
                 text-neutral-500
                 cursor-pointer
                 hover:underline
                 hidden
                 md:block
                "
            >
              @{data.user.username}
            </span>
            <span className="  text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
          {/* <div className=" flex flex-row items-center mt-3 gap-10">
            <div className=" flex flex-row items-center text-neutral-500 gap-2 transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={likeHandler}
              className=" flex flex-row items-center text-neutral-500 gap-2 transition hover:text-red-500"
            >
              <LikeIcon size={20} color={isLiking ? "red" : ""} />
              <p>{data.likedId?.length}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
