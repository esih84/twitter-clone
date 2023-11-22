'use client'

import Header from "@/components/layout/Header";
import Form from "@/components/modules/Form";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/modules/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const PostView = ({ params: { postId } }) => {
    const router = useRouter()

    const {data: fetchedPost, isLoading}= usePost(postId)
    // console.log(fetchedPost)
    if (isLoading || !fetchedPost) {
        return(
            <div className=" flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }
    return (
      <div>
        <Header lable="Tweet" showBackArrow />
        <PostItem data={fetchedPost} />
        <Form postId={postId} isComment={true} placeHolder="Tweet your replay" />
        <CommentFeed comments={fetchedPost?.comments}/>
      </div>  
    );
}

export default PostView;