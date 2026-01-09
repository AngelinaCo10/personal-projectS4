import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { eurosToCents, isValidAmount, isValidMessage, makeToken } from "@/lib/giftCard";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sender_name = String(body.sender_name ?? "").trim();
    const message = String(body.message ?? "").trim();
    const amount_eur = Number(body.amount_eur);

    if (!sender_name) return NextResponse.json({ error: "Vul je naam in." }, { status: 400 });
    if (!isValidMessage(message)) return NextResponse.json({ error: "Bericht is te kort of te lang." }, { status: 400 });
    if (!isValidAmount(amount_eur)) return NextResponse.json({ error: "Ongeldig bedrag." }, { status: 400 });

    const claim_token = makeToken();
    const amount_cents = eurosToCents(amount_eur);

    const supabase = supabaseServer();
    const { error } = await supabase.from("gift_cards").insert({
      sender_name,
      message,
      amount_cents,
      currency: "EUR",
      claim_token,
      status: "sent",
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ token: claim_token }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
