import { Suspense } from "react";
import CustomizeClient from "./CustomizeClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading customize...</div>}>
      <CustomizeClient />
    </Suspense>
  );
}
