"use client";
import Header from "@/components/layout/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
// import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const UserView = ({ params: { userId } }) => {
  //  const router = useRouter()
  const { data: fetchUser, isLoading } = useUser(userId);
    // console.log(fetchUser)
  if (isLoading || !fetchUser) {
    return(
        <div
        className="
              flex
               justify-center
               items-center
                h-full
          "
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }
  return (
    <>
      <Header showBackArrow lable={fetchUser?.name} />
      <UserHero userId={userId}/>
      <UserBio userId={userId}/>
      <PostFeed userId={userId}/>
    </>
  );
};

export default UserView;
