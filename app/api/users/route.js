import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "Users"');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chyba pri načítaní používateľov" }, { status: 500 });
  }
}