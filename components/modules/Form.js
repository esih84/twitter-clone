"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

const Form = ({ placeHolder, isComment = false, postId = false }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  // console.log(  currentUser)
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(isComment);
  const submitHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? "/api/comments" : "/api/posts";
      // console.log(url)
      const send = isComment ? { body, postId } : { body };
      const message = isComment ? "comment created" : " Tweet created";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(send),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.error) {
        toast.success(message);

        setBody("");
        mutatePosts();
        mutatePost();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("somethings went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);
  return (
    <div className="  border-b border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className=" flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className=" w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
             disabled:opacity-80
             peer
             resize-none 
             mt-3
             w-full
             bg-black
             ring-0
             outline-none
             text-[20px]
             placeholder-neutral-500
             text-white
            "
              placeholder={placeHolder}
            ></textarea>
            <hr
              className="
             opacity-0
             peer-focus:opacity-100
             h-[1px]
             w-full
             border-neutral-800
             transition
            "
            />
            <div className=" mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={submitHandler}
                lable="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className=" py-8">
          <h1
            className=" text-white text-2xl
                text-center
                 mb-4
                  font-bold"
          >
            Welcome to Twitter
          </h1>
          <div className=" flex flex-row items-center justify-center gap-4">
            <Button lable="Login" onClick={loginModal.onOpen} />
            <Button lable="Register" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
