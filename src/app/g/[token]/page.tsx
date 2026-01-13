import { supabaseServer } from "@/lib/supabaseServer";

type Gift = {
  sender_name: string;
  message: string;
  amount_cents: number;
  currency: string;
  sent_at: string;
};

export default async function GiftPage(
  props: { params: Promise<{ token: string }> }
) {
  const { token } = await props.params; // ✅ unwrap params promise

  const supabase = supabaseServer();
  const { data: gift, error } = await supabase
    .from("gift_cards")
    .select("sender_name,message,amount_cents,currency,sent_at")
    .eq("claim_token", token)
    .maybeSingle<Gift>();

  if (error) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
        <h1>Database error</h1>
        <p>{error.message}</p>
        <p>Token: {token}</p>
      </main>
    );
  }

  if (!gift) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
        <h1>Niet gevonden</h1>
        <p>Token: {token}</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Je hebt een cadeau gekregen 🎁</h1>
      <p><strong>Van:</strong> {gift.sender_name}</p>
      <p><strong>Bedrag:</strong> € {(gift.amount_cents)}</p>
      <p><strong>Bericht:</strong></p>
      <p>{gift.message}</p>
    </main>
  );
}
