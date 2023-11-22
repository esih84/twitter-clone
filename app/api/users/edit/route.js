import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  try {

    const { currentUser } = await serverAuth();
    // console.log(currentUser)
    const { name, username, bio, profileImage, coverImage } = await request.json();
    // console.log({ name, username, bio, profileImage, coverImage } )
    if (!name || !username) {
      return NextResponse.json(
        { error: "please inter name and username" },
        { status: 400 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error:"something went error " }, { status: 400 });
  }
};
