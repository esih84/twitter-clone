import Header from "@/components/layout/Header"
import Form from "@/components/modules/Form"
import PostFeed from "@/components/posts/PostFeed"
export default function Home() {
  return (
    <>
      <Header  lable="Home"/>
      <Form placeHolder=" What's happening?"/>
      <PostFeed/>
    </>
  )
}
