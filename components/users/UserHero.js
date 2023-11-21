import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../modules/Avatar";

const UserHero = ({ userId }) => {
  const { data: fetchUser } = useUser(userId);

  return (
    <div className=" bg-neutral-700 h-44 relative">
      {fetchUser?.coverImage && (
        <Image
          src={fetchUser.coverImage}
          fill
          alt="Cover Image"
          style={{ objectFit: "cover" }}
        />
      )}
      <div className=" absolute -bottom-16 left-4">
        <Avatar isLarge hasBorder userId={userId} />
      </div>
    </div>
  );
};

export default UserHero;
