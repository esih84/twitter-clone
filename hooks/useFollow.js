"use client";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "./useUser";

const useFollow = (userId) => {
  //   A person who follows
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  //   The person being followed
  const { mutate: mutateFetchUser } = useUser(userId);
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }
      await request();
      mutateCurrentUser();
      mutateFetchUser();
      toast.success("success");
    } catch (error) {
      toast.error("something went wrong");
    }
  }, [isFollowing, userId, mutateCurrentUser, mutateFetchUser]);

  // console.log(data)
  return { isFollowing, toggleFollow };
};

export default useFollow;
