import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function GET(react, { params }) {
    const { id } = params;
    try {
      const result = await pool.query('SELECT * FROM "Produkty" WHERE id = $1', [id]);
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Chyba pri načítaní produktov" }, { status: 500 });
    }
  }