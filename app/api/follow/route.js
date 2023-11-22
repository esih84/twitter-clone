import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!userId) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }
    const updatedFollowIds = [...(user.followingIds || [])];
    updatedFollowIds.push(userId);
    //
    //
    //
    ///
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowIds,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
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
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!userId) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: " invalid Id" }, { status: 400 });
    }
    let updatedFollowIds = [...(user.followingIds || [])];
    updatedFollowIds = updatedFollowIds.filter(
      (folowingId) => folowingId !== userId
    );
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowIds,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went error " },
      { status: 400 }
    );
  }
};
