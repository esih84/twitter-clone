import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import Button from "../modules/Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

const UserBio = ({ userId }) => {
  const { data: currentUser } = useCurrentUser(userId);
  const { data: fetchUser } = useUser(userId);
  console.log(fetchUser)
 const editModal = useEditModal()

 const { isFollowing, toggleFollow}= useFollow(userId)
  const createdAt = useMemo(() => {
    if (!fetchUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchUser.createdAt), "MMMM yyyy");
  }, [!fetchUser?.createdAt]);
  return (
    <div className=" border-b border-neutral-800 pb-4">
      <div className=" flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary lable="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button secondary={!isFollowing} outline={isFollowing} lable={isFollowing? "unFollow": "Follow"} onClick={toggleFollow} />
        )}
      </div>
      <div className=" mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{fetchUser?.name}</p>
          <p className=" text-sm text-neutral-500">@{fetchUser?.username}</p>
        </div>
        <div className=" flex flex-col mt-4">
          <p className=" text-white">{fetchUser?.bio}</p>
          <div
            className=" flex 
            flex-row
            items-center
            gap-2
            mt-4
          text-neutral-500
            "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className=" flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className=" text-white">{fetchUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className=" text-white">{fetchUser?.followerscount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
