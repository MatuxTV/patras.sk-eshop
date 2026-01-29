import { NextResponse } from "next/server";
import pool from "@/app/api/postgresql";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const result = await pool.query('SELECT * FROM "Produkty" WHERE id = $1', [
      id,
    ]);

    // Serialize images to base64 for client components
    const serializedRows = result.rows.map((row) => ({
      ...row,
      obrazok: row.obrazok
        ? `data:image/jpeg;base64,${Buffer.from(row.obrazok).toString("base64")}`
        : null,
    }));

    return NextResponse.json(serializedRows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Chyba pri načítaní produktov" },
      { status: 500 },
    );
  }
}
