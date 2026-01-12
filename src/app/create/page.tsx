"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function ConfirmModal({
  open,
  message,
  onConfirm,
  onClose,
}: {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-[390px] rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Weet je het zeker?</h3>
        <p className="text-gray-600 mb-5">{message}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-2xl py-3 font-medium border border-gray-200"
          >
            Nee, doorgaan
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-1/2 rounded-2xl py-3 font-medium bg-black text-white"
          >
            Ja, stoppen
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  const router = useRouter();

  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number>(10);

  const [confirmOpen, setConfirmOpen] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      senderName,
      message,
      amount: String(amount),
    });

    router.push(`/create/customize?${params.toString()}`);
  }

  return (
    <>
      <div className="min-h-screen bg-blue-400 md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-blue-400 p-6 md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
          {/* Header IN de telefoon */}
          <div className="mt-[60px] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="rounded-xl px-3 py-2 text-sm font-medium bg-white/10 text-white border border-white/30"
            >
              Cancel
            </button>

            <h1 className="text-3xl text-white font-rowdies text-center flex-1">
              GIFTY
            </h1>

            {/* Spacer zodat titel gecentreerd blijft */}
            <div className="w-[72px]" />
          </div>

          {/* Center card */}
          <div className="flex-1 flex items-center justify-center">
            <form
              onSubmit={onSubmit}
              className="w-full bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-center mb-1">
                Create your gift
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Write your message and choose an amount.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your name
              </label>
              <input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Eliza"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
              />

              <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something sweet..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
              />

              <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
                Amount (€)
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 25].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(v)}
                    className={`rounded-xl py-3 font-medium border transition ${
                      amount === v
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-200"
                    }`}
                  >
                    €{v}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl py-4 font-medium bg-black text-white disabled:opacity-50"
                disabled={!senderName || !message || amount < 1}
              >
                Next
              </button>
            </form>
          </div>
        </main>
      </div>

      <ConfirmModal
        open={confirmOpen}
        message="Weet je zeker dat je wilt stoppen? Je wijzigingen gaan verloren."
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => router.push("/")}
      />
    </>
  );
}
