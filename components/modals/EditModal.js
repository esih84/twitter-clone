"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "../modules/Input";
import ImageUpload from "../modules/ImageUpload";
const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUserName(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.bio,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users/edit", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          username,
          profileImage,
          coverImage,
          bio,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.error) {
        toast.success("Updated");
        editModal.onClose();

        mutateFetchedUser();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(" something went worng");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    coverImage,
    profileImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <ImageUpload
        lable="upload profile image"
        onChange={(e) => setProfileImage(e)}
        value={profileImage}
        disabled={isLoading}
      />
      <ImageUpload
        lable="upload cover image"
        onChange={(e) => setCoverImage(e)}
        value={coverImage}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />

      <Input
        placeholder="Username"
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Your Profile"
      actionLable="Save"
      onClose={editModal.onClose}
      onSubmit={submitHandler}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default EditModal;
