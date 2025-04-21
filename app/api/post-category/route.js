import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function POST(req) {
  try {
    const body = await req.json();

    const { nazov, obrazok } = body;

    if (!nazov || !obrazok) {
      return NextResponse.json(
        { error: "Chýbajú povinné údaje" },
        { status: 400 }
      );
    }
    
    const imageBuffer = Buffer.from(obrazok);

    const result = await pool.query(
      `INSERT INTO "Kategoria" ("nazov", "obrazok") VALUES ($1, $2) RETURNING id`,
      [nazov, imageBuffer]
    );

    return NextResponse.json(
      {
        message: "Kategória bola úspešne pridaná",
        id: result.rows[0].id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Chyba pri pridávaní kategórie:", err);
    return NextResponse.json({ error: "Chyba servera" }, { status: 500 });
  }
}
