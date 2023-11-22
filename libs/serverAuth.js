import { getServerSession } from "next-auth/next";
// import { getSession } from "next-auth/react"
import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!session?.user?.email) {
    throw new Error("not Signed in")
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  // console.log(currentUser)
  if (!currentUser) {
    throw new Error("not Signed in")
  }
  return { currentUser };
};

export default serverAuth;
