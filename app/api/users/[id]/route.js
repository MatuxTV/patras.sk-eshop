import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function PATCH(req, { params }) {
  const id = params.id;

  try {
    await pool.query('UPDATE "Users" SET active = false WHERE id = $1', [id]);
    return NextResponse.json({ message: "Používateľ bol úspešne odstránený" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chyba pri aktualizácii" }, { status: 500 });
  }
}