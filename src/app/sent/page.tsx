"use client";

import { Suspense } from "react";
import SentContent from "./SentContent";

export default function SentPage() {
  return (
    <Suspense fallback={<main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>Laden…</main>}>
      <SentContent />
    </Suspense>
  );
}
