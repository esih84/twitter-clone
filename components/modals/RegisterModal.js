"use client";
import { useState, useCallback } from "react";
import Input from "../modules/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleHandler = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const submitHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      // Todo add Register

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>Already have an account?</p>
      <span
        onClick={toggleHandler}
        className=" text-white cursor-pointer hover:underline"
      >
        Sign In
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="create an account"
      actionLable="Register"
      onClose={registerModal.onClose}
      onSubmit={submitHandler}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
