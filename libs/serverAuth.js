import { getServerSession } from "next-auth/next";
// import { getSession } from "next-auth/react"
import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "not Signed in" }, { status: 400 });
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  // console.log(currentUser)
  if (!currentUser) {
    return NextResponse.json({ error: "not Signed in" }, { status: 400 });
  }
  return { currentUser };
};

export default serverAuth;
