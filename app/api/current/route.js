import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export const GET = async (req) => {
  try {

    const {currentUser}= await serverAuth()
    // console.log(currentUser)
    return NextResponse.json({...currentUser},{status:200})

  } catch (error) {
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }
};


