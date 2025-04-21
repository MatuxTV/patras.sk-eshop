import { NextResponse } from "next/server";
import { sendMailCustomer, sendMailOwner } from "@/lib/mailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, email } = body;

    if (type === "customer") {
      await sendMailCustomer(email);
    } else if (type === "owner") {
      await sendMailOwner();
    } else {
      return NextResponse.json({ success: false, message: "Neznámy typ emailu" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Chyba pri odosielaní emailu:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}