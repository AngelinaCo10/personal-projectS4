import { Suspense } from "react";
import SentClient from "./SentClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading preview...</div>}>
      <SentClient />
    </Suspense>
  );
}
