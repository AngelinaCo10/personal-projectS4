// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";

// export async function GET(_req: Request, { params }: { params: { token: string } }) {
//   const supabase = supabaseServer();

//   const { data, error } = await supabase
//     .from("gift_cards")
//     .select("sender_name,message,amount_cents,currency,sent_at")
//     .eq("claim_token", params.token)
//     .maybeSingle();

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });
//   if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

//   return NextResponse.json(data, { status: 200 });
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // ... jouw logic
  return NextResponse.json({ token });
}
