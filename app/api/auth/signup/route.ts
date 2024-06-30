import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import client from "@/db";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    console.log(username, email, password);
    const user = await client.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    // const response = await sql`
    // INSERT INTO users(email,password)
    // VALUES(${email},${password})
    // `;
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ message: "success" });
}
