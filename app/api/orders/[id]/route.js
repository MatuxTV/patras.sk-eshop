import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function PATCH(req, { params }) {
  const { id } = await params;

  try {
    await pool.query('UPDATE "Objednavka" SET proces = false WHERE id = $1', [
      id,
    ]);
    return NextResponse.json({ message: "Objednávka bola vybavená" });
  } catch (error) {
    return NextResponse.json(
      { error: "Chyba pri aktualizácii" },
      { status: 500 },
    );
  }
}
