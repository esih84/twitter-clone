
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/post/${postId}`,fetcher)
  // console.log(data)
  return { data, error, isLoading, mutate };
};

export default usePost;
