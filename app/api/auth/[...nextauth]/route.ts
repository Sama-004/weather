import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
// import { PrismaClient } from "@prisma/client/extension";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "../../prisma/generated/client/edge";
import client from "@/db";

// const prisma = new PrismaClient();

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
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });

        // Directly compare the plaintext passwords
        if (!user || user.password !== credentials.password) {
          throw new Error("Invalid email or password");
        }

        // Return user object to signify successful authentication
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  //         const session = await getServerSession();
  //         if (!credentials?.email || !credentials.password) {
  //           return null;
  //         }
  //         const user = await prisma.user.findUnique({
  //           where: { email: credentials.email },
  //         });

  //         if (
  //           !user ||
  //           !(await bcrypt.compare(credentials.password, user.password))
  //         ) {
  //           return null;
  //         }

  //         return { id: user.id, name: user.name, email: user.email };
  //       },
  //     }),
  //   ],
  adapter: PrismaAdapter(client),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
