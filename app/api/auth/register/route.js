import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
export const POST = async (request) => {
  try {
    const { email, username, name, password } = await request.json();
    console.log({ email, username, name, password });
    if (!email || !username || !name || !password) {
      return NextResponse.json({ error: "invalid data" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    // console.log(user)
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error:"something went error " }, { status: 400 });
  }
};
