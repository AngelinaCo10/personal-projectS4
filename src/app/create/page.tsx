"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number>(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: senderName,
          message,
          amount_eur: amount,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Er ging iets mis");

      router.push(`/sent?token=${data.token}`);
    } catch (err: any) {
      setError(err.message ?? "Onbekende fout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Maak cadeau</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Van wie is het cadeau?
          <input value={senderName} onChange={(e) => setSenderName(e.target.value)} required />
        </label>

        <label>
          Bericht
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />
        </label>

        <label>
          Bedrag (€)
          <input type="number" min={1} max={500} value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
        </label>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={loading} type="submit">
          {loading ? "Versturen..." : "Verstuur cadeau"}
        </button>
      </form>
    </main>
  );
}
