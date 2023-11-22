import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, {params: {userId}}) => {
  try {
    // console.log(userId)
    const existingUser = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    const followerscount = await prisma.user.count({
        where:{
            followingIds:{
                has: userId
            }
        }
    });
    // console.log(users)
    return NextResponse.json({...existingUser, followerscount}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error:"something went error " }, { status: 400 });
  }
};
