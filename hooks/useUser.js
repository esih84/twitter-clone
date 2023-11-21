import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(userId? `/api/users/${userId}`: null, fetcher);
  // console.log(data)
  return { data, error, isLoading, mutate };
};

export default useUser;