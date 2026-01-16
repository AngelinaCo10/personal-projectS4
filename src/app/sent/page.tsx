import { Suspense } from "react";
import SentClient from "./SentClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen p-6 items-center justify-center bg-[#53CCFF] text-white font-[Rowdies]">Loading...</div>}>
      <SentClient />
    </Suspense>
  );
}
