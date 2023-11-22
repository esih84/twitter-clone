"use client";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({postId,userId=false}) => {
  //   A person who follows
  const { data: currentUser} = useCurrentUser();
  //   The person being followed
  const {data: fetchedPost, mutate: mutatefetchedPost } = usePost(postId);
  const {mutate: mutatefetchedPosts } = usePosts(userId);
  
  const loginModal = useLoginModal();

  const isLiking = useMemo(() => {
    const list = fetchedPost?.likedId || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost?.likedId, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isLiking) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }
      await request();
      mutatefetchedPosts();
      mutatefetchedPost();
      toast.success("success");
    } catch (error) {
      toast.error("something went wrong");
    }
  }, [currentUser,isLiking, postId, mutatefetchedPost, mutatefetchedPosts, loginModal]);

  // console.log(data)
  return { isLiking, toggleLike };
};

export default useLike;
