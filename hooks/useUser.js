import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId) => {
  // console.log(userId)
  const url = `/api/users/${userId}`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  // console.log(data)
  return { data, error, isLoading, mutate };
};

export default useUser;