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
                <h3 className="text-lg font-semibold mb-2 flex justify-center">Are you sure?</h3>
                <p className="text-gray-600 mb-5">{message}</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-1/2 rounded-2xl py-3 font-medium border border-gray-200"
                    >
                        No, stay here
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-1/2 rounded-2xl py-3 font-medium bg-[#303030] text-white"
                    >
                        Yes, I am
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
  const [formError, setFormError] = useState<string | null>(null);

function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setFormError(null);

  const nameOk = senderName.trim().length > 0;
  const msgOk = message.trim().length > 0;
  const amountOk = Number.isFinite(amount) && amount >= 1;

  if (!nameOk || !msgOk || !amountOk) {
    if (!nameOk) return setFormError("Fill in your name");
    if (!msgOk) return setFormError("Write a message");
    return setFormError("Kies een bedrag van minimaal €1.");
  }

  const params = new URLSearchParams({
    senderName: senderName.trim(),
    message: message.trim(),
    amount: String(amount),
  });

  router.push(`/customize?${params.toString()}`);
}

  return (
    <>
      <div className="min-h-screen bg-[#5ECCFF] md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-[#5ECCFF] md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col ">
          {/* Header IN de telefoon */}
          <div className="flex items-center justify-center">


            <h1 className="text-[48px] text-white font-rowdies text-center font-['Rowdies']">
              GIFTY
            </h1>

          </div>

          {/* Center card */}
          <div className="flex-1 flex">
            <form
              onSubmit={onSubmit}
              className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col"
            >
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="self-end rounded-xl px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200"
              >
                X 
              </button>

              <h2 className="text-3xl font-semibold text-start ml-3 mb-1 mt-3 text-[#5ECCFF] font-['Rowdies']">
                Make your Gifty
              </h2>
              <p className="text-start text-gray-600 ml-3 mb-6 font-['Anonymous_Pro']">
                Write your message and choose an amount.
              </p>
              <div className=" p-4 flex flex-col bg-white rounded-3xl relative shadow-[0px_4px_13px_0px_rgba(94,204,255,1.00)] border border-neutral-400 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Anonymous_Pro']">
                  Your name
                </label>
                <input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Eliza"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />

                <label className="block text-sm font-medium text-gray-700 mt-5 mb-2 font-['Anonymous_Pro']">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something sweet..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />

                <label className="block text-sm font-medium text-gray-700 mt-5 mb-2 font-['Anonymous_Pro']">
                  Amount (€)
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 25].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAmount(v)}
                      className={`rounded-xl py-3 font-medium border transition ${amount === v
                        ? "bg-[#303030] text-white border-bg-[#303030]"
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
              </div>

{formError && (
  <p className="mb-3 text-sm text-red-600 text-center font-['Anonymous_Pro']">
    {formError}
  </p>
)}

              <button
                type="submit"
                className="mt-auto w-full rounded-4xl py-4 font-medium bg-[#53ccff] text-white hover:disabled:opacity-50 font-['Rowdies']"
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
