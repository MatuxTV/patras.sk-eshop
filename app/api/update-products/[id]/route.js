import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  try {
    await pool.query(
      `UPDATE "Produkty" 
       SET nazov = $1, cena = $2, popis = $3, mnozstvo = $4, kategoria = $5, dostupnost = $6 
       WHERE id = $7`,
      [
        body.nazov,
        body.cena,
        body.popis,
        body.mnozstvo,
        body.kategoria,
        body.dostupnost,
        id,
      ],
    );

    return NextResponse.json(
      { message: "Produkt bol úspešne aktualizovaný" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Chyba pri aktualizácii produktu:", error);
    return NextResponse.json(
      { error: "Chyba pri aktualizácii" },
      { status: 500 },
    );
  }
}
