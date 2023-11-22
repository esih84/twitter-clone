import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { postId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!postId) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ error: " post dosen't exist" }, { status: 400 });
    }
    const updatedLikeIds = [...(post.likedId || [])];
    updatedLikeIds.push(currentUser.id);
    //
    //
    //
    ///
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedId: updatedLikeIds,
      },
    });
    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went error " },
      { status: 400 }
    );
  }
};
//
//
//
//

export const DELETE = async (request) => {
  try {
    const { postId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!postId) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ error: " post dosen't exist" }, { status: 400 });
    }
    let updatedLikeIds = [...(post.likedId || [])];
    updatedLikeIds = updatedLikeIds.filter(
      (LikeId) => LikeId !== currentUser.id
    );
    const updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedId: updatedLikeIds,
        },
      });
    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went error " },
      { status: 400 }
    );
  }
};
