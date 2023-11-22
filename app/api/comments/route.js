import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";


export const POST=async(request)=>{
    try {
        const {currentUser}= await serverAuth()
        const {body, postId}= await request.json()
        // console.log({body, postId})
        if (!body ) {
            console.log(error);
            return NextResponse.json(
              { error: "please inter data " },
              { status: 400 }
            );
        }
        if (!postId ) {
            console.log(error);
            return NextResponse.json(
              { error: "Invalid Id " },
              { status: 400 }
            );
        }

        const comment = await prisma.comment.create({
            data:{
                body,
                userId : currentUser.id,
                postId:postId
            }
        })
        return NextResponse.json(comment,
            { status: 201 }
          );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "something went error " },
          { status: 400 }
        );
    }
}