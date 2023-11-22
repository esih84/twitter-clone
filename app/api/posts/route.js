import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { currentUser } = await serverAuth();
    const { body } =await request.json();
    // console.log(body)
    if (!body) {
      return NextResponse.json({ error: "invalid Data " }, { status: 400 });
    }
    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went error " },
      { status: 400 }
    );
  }
};

export const GET = async (request) => {
  //   console.log(request);
  try {
    const posts = await prisma.post.findMany({
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
