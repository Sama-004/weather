import nextAuth from "next-auth";
import { Prisma } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const session = await getServerSession();
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null;
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
});
