import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "Produkt_skladania"');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Chyba pri načítaní skladania" }, { status: 500 });
  }
}