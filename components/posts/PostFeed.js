"use client";
import usePosts from "@/hooks/usePosts";
import PostItem from "./modules/PostItem";

const PostFeed = ({userId = false}) => {
    const { data : posts = []} = usePosts(userId)
    // console.log(posts)
    return (
        <>
            { posts.length>0&& posts.map(post=>(
                <PostItem
                userId = {userId}
                key = {post.id}
                data = {post}
                />
            ))}
        </>
    );
}

export default PostFeed;