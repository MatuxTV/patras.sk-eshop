import { NextResponse } from 'next/server';
import pool from '@/app/api/postgresql'; // Uisti sa, že tento import funguje správne

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      cartItems,
      user,
      note,
      total,
      fakturacneUdaje,
    } = body;

    const {
      firstName,
      lastName,
      email,
      prefix,
      phoneNumber,
      street,
      city,
      postalCode,
      companyName,
      ico,
      dic,
      icdph,
    } = fakturacneUdaje;

    const result = await pool.query(
      `INSERT INTO "Objednavka" (
        "meno", "priezvisko", "email", "prefix", "t_cislo",
        "cena_objednavky", "ulica", "mesto", "psc", "poznamka",
        "nazov_spolocnost", "ico", "dic", "icdph", "date_created", "user_created"
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, NOW(), $15
      ) RETURNING id;`,
      [
        firstName,
        lastName,
        email,
        prefix,
        phoneNumber,
        total,
        street,
        city,
        postalCode,
        note,
        companyName || null,
        ico || null,
        dic || null,
        icdph || null,
        user?.id || null,
      ]
    );

    const objednavkaId = result.rows[0].id;

    // Skladanie produktov
    for (const item of cartItems) {
      await pool.query(
        `INSERT INTO "Produkt_skladania" ("id_objednavka", "id_produkt", "pocet_kusov")
         VALUES ($1, $2, $3);`,
        [objednavkaId, item.id, item.quantity]
      );

      const noveMnozstvo = item.mnozstvo - item.quantity;
      await pool.query(
        `UPDATE "Produkty"
         SET "mnozstvo" = $1, "dostupnost" = $2
         WHERE "id" = $3;`,
        [noveMnozstvo, noveMnozstvo > 0, item.id]
      );
    }

    return NextResponse.json({ success: true, id: objednavkaId });
  } catch (error) {
    console.error("Chyba pri spracovaní objednávky:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}