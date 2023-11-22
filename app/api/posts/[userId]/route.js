import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params: { userId } }) => {
  try {
    //   console.log(userId)

    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (posts.length < 1) {
      return NextResponse.json(
        { posts: "any post dosen't exist" },
        { status: 200 }
      );
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something went error " },
      { status: 400 }
    );
  }
};
