import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { first_name, last_name, email, password } = await request.json();

    const checkUser = await pool.query(
      'SELECT * FROM "Users" WHERE email = $1',
      [email]
    );

    if (checkUser.rows.length > 0) {
      return NextResponse.json(
        { message: "This user already exist" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO "Users" (first_name, last_name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)`,
      [first_name, last_name, email, hashedPassword, process.env.USER_ROLE || "user"]
    );

    return NextResponse.json({ message: "Account Created!" }, { status: 201 });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json(
      { message: "An unexpected error occurred, please try again" },
      { status: 500 }
    );
  }
}