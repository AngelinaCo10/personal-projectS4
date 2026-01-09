import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>GiftingApp</h1>
      <p>Maak een cadeau met bericht en bedrag en deel een link.</p>
      <Link href="/create">Maak cadeau →</Link>
    </main>
  );
}
