import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params: { postId } }) => {
    try {

        if (!postId) {
            return NextResponse.json(
                { error: "post dosen't exist " },
                { status: 400 }
              );
        }
  
      const post = await prisma.post.findMany({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include:{
                user:true
            },
            orderBy:{
                createdAt: 'desc'
            }
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  

      return NextResponse.json(...post, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "something went error " },
        { status: 400 }
      );
    }
  };
  