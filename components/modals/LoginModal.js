"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { useState, useCallback } from "react";
import Input from "../modules/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleHandler = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const submitHandler = useCallback(
    async () => {
      try {
        setIsLoading(true);
        // Todo add login
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!res.error) {
          toast.success("account created");

          loginModal.onClose();
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [loginModal, email, password]
  );

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );
  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>First time using Twitter?</p>
      <span
        onClick={toggleHandler}
        className=" text-white cursor-pointer hover:underline"
      >
        Sign Up
      </span>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLable="Sign In"
      onClose={loginModal.onClose}
      onSubmit={submitHandler}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
