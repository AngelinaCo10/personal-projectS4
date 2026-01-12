import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json();

  const sender_name = String(body.sender_name ?? "");
  const message = String(body.message ?? "");
  const amount_cents = Number(body.amount_cents ?? 0);
  const currency = String(body.currency ?? "EUR");
  const claim_token = String(body.claim_token ?? "");

  if (!sender_name || !message || !claim_token || !Number.isFinite(amount_cents) || amount_cents < 1) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = supabaseServer();

  const { error } = await supabase.from("gift_cards").insert({
    sender_name,
    message,
    amount_cents,
    currency,
    claim_token,
    sent_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ token: claim_token }, { status: 200 });
}
