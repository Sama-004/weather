import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    console.log(username, email, password);
    const response = await sql`
    INSERT INTO users(email,password)
    VALUES(${email},${password})
    `;
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ message: "success" });
}
