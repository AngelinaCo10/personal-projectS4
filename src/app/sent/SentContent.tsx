"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SentContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
        <h1>Geen token gevonden</h1>
      </main>
    );
  }

  const path = `/g/${token}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(path);
    } catch {
      window.prompt("Kopieer de link:", path);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>🎉 Je cadeau is verstuurd!</h1>
      <p>Deel deze link:</p>
      <p>
        <Link href={path}>{path}</Link>
      </p>
      <button onClick={copy}>Kopieer link</button>
    </main>
  );
}
