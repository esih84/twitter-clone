
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (userId = false) => {
    const url = userId ? `/api/posts/${userId}`: "/api/posts"
  const { data, error, isLoading, mutate } = useSWR(url,fetcher)
  // console.log(data)
  return { data, error, isLoading, mutate };
};

export default usePosts;
