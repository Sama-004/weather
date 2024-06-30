import { sql } from "@vercel/postgres";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/db";

const handler = nextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "Email@provider.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // const response = await sql`
        // SELECT * FROM users WHERE email=${credentials?.email}`;
        // const user = response.rows[0];
        const user = await client.user.findUnique({
          where: { email: credentials?.email },
        });
        if (user && credentials?.password === user.password) {
          return {
            id: user.id.toString(),
            email: user.email,
          };
          // if (credentials?.password === user.password) {
          //   const correctPass = user.password;
          //   return {
          //     id: user.id,
          //     email: user.email,
          //   };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
