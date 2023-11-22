import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(users)
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error:"something went error " }, { status: 400 });
  }
};
