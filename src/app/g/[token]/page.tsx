import { supabaseServer } from "@/lib/supabaseServer";

type Gift = {
  sender_name: string;
  message: string;
  amount_cents: number;
  currency: string;
  sent_at: string;
};

export default async function GiftPage({
  params,
}: {
  params: { token: string };
}) {
  const supabase = supabaseServer();

  const { data: gift, error } = await supabase
    .from("gift_cards")
    .select("sender_name,message,amount_cents,currency,sent_at")
    .eq("claim_token", params.token)
    .maybeSingle<Gift>();

  if (error || !gift) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
        <h1>Niet gevonden</h1>
        <p>Deze link is ongeldig of het cadeau bestaat niet.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Je hebt een cadeau gekregen 🎁</h1>

      <p>
        <strong>Van:</strong> {gift.sender_name}
      </p>

      <p>
        <strong>Bedrag:</strong> € {(gift.amount_cents / 100).toFixed(2)}
      </p>

      <p>
        <strong>Bericht:</strong>
      </p>
      <p>{gift.message}</p>
    </main>
  );
}
