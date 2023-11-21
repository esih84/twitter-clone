"use client";
import { useState, useCallback } from "react";
import Input from "../modules/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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

  const submitHandler = useCallback(
    async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, username, name, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!data.error) {
          toast.success("account created");

          registerModal.onClose();

          await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
        } else {
          toast.error(data.error);
        }
        //  const res = await axios.post(
        //     "/api/auth/register",
        //     {
        //       email,
        //       password,
        //       username,
        //       name,
        //     },
        //     { headers: { "Content-Type": "application/json" } }
        //   );
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [registerModal, email, password, username, name]
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
        type="password"
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
