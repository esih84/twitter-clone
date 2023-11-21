import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb"
export const authOptions = {
  session :{
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // name: "credentials",
      // credentials: {
      //   email: { label: "email", type: "text" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
        // console.log(credentials)
        const {email, password} = credentials
        if (!email || !password) {
          throw new Error("invalid data");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("user dosent exist");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isValid) {
          throw new Error("invalid credentials");
        }
        return user;
      },
    }),
    // ...add more providers here
  ],
  // debug: process.env.NODE_ENV === 'development',

  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret:process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
