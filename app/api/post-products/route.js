import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nazov,
      popis,
      cena,
      dostupnost,
      mnozstvo,
      kategoria,
      obrazok, // base64 string (napr. "data:image/jpeg;base64,...")
    } = body;

    // Voliteľná validácia
    if (!nazov || !cena || !obrazok) {
      return NextResponse.json({ error: "Chýbajú povinné údaje" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(obrazok);

    const result = await pool.query(
      `INSERT INTO "Produkty" 
      ("nazov", "popis", "cena", "dostupnost", "mnozstvo", "kategoria", "obrazok") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [nazov, popis, cena, dostupnost, mnozstvo, kategoria, imageBuffer]
    );

    return NextResponse.json({ message: "Produkt bol úspešne pridaný", id: result.rows[0].id });
  } catch (err) {
    console.error("Chyba pri pridávaní produktu:", err);
    return NextResponse.json({ error: "Chyba servera" }, { status: 500 });
  }
}