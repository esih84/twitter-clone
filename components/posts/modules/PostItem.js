"use client";
import Avatar from "@/components/modules/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { da } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

const PostItem = ({ data, userId = false }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const {isLiking, toggleLike}= useLike({postId:data.id, userId})

  const goToUser = useCallback(
    (e) => {
      e.stopPropagation();
      router.push(`/users/${data.userId}`);
    },
    [router, data.userId]
  );
  const goToPost = useCallback((e) => {
    e.stopPropagation();
    router.push(`/post/${data.id}`);
  });
  const likeHandler = useCallback((e) => {
    e.stopPropagation();
    if (!currentUser) {
      
      return loginModal.onOpen();
    }
    toggleLike()
  },[currentUser, loginModal, toggleLike]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  },[data.createdAt]);

  const LikeIcon = isLiking ? AiFillHeart : AiOutlineHeart
  return (
    <div
      onClick={goToPost}
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
          <div className=" flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className=" 
                        text-white
                         font-semibold
                         cursor-pointer
                         hover:underline
                        
                        "
            >
              {data.user?.name}
            </p>
            <span
              onClick={goToUser}
              className=" text-neutral-500 cursor-pointer hover:underline hidden md:block 
                        "
            >
              @{data.user?.username}
            </span>
            <span className="  text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
          <div className=" flex flex-row items-center mt-3 gap-10">
            <div className=" flex flex-row items-center text-neutral-500 gap-2 transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div onClick={likeHandler} className=" flex flex-row items-center text-neutral-500 gap-2 transition hover:text-red-500">

              <LikeIcon size={20} color={isLiking?"red": ''} />
              <p>{data.likedId?.length }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
