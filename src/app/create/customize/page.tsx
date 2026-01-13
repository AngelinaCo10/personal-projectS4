"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

const MUSIC_OPTIONS = [
  { id: "none", label: "No music" },
  { id: "lofi", label: "Lo-fi" },
  { id: "happy", label: "Happy" },
  { id: "piano", label: "Piano" },
];

const GIFT_COLORS = [
  { name: "Pink", value: "#ff4fa3" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
];

const CARD_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Cream", value: "#fff7ed" },
  { name: "Light Gray", value: "#f3f4f6" },
  { name: "Light Pink", value: "#ffe4e6" },
];

export default function CustomizePage() {
  const router = useRouter();
  const sp = useSearchParams();

  const base = useMemo(() => {
    return {
      senderName: sp.get("senderName") ?? "",
      message: sp.get("message") ?? "",
      amount: sp.get("amount") ?? "10",
    };
  }, [sp]);

  const [music, setMusic] = useState("lofi");
  const [giftColor, setGiftColor] = useState(GIFT_COLORS[0].value);
  const [cardColor, setCardColor] = useState(CARD_COLORS[0].value);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function goPreview() {
    const params = new URLSearchParams({
      senderName: base.senderName,
      message: base.message,
      amount: base.amount,
      music,
      giftColor,
      cardColor,
    });

    router.push(`/preview?${params.toString()}`);
  }

  function goBack() {
    const params = new URLSearchParams({
      senderName: base.senderName,
      message: base.message,
      amount: base.amount,
    });
    router.push(`/create?${params.toString()}`);
  }

  return (
    <>
      <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-[#53ccff] md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
          {/* Header */}
          <div className="mt-[60px] flex items-center justify-center">
            <h1 className="text-[48px] text-white font-rowdies text-center font-['Rowdies']">
              GIFTY
            </h1>
          </div>

          {/* Card / sheet */}
          <div className="flex-1 flex">
            <div className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col">
              {/* Cancel (zelfde plek als Create) */}
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="self-start rounded-xl px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200"
              >
                X
              </button>

              <h2 className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 text-[#53ccff] font-['Rowdies']">
                Customize
              </h2>
              <p className="text-start ml-3  text-gray-600 mb-6 font-['Anonymous_Pro']">
                Choose music and colors.
              </p>
              <div className=" p-4 flex flex-col bg-white rounded-3xl relative shadow-[0px_4px_13px_0px_rgba(94,204,255,1.00)] border border-neutral-400 mb-6">

              {/* Music */}
              <p className="text-sm font-medium text-gray-700 mb-2 font-['Anonymous_Pro']">Music</p>
              <div className="grid grid-cols-2 gap-3">
                {MUSIC_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMusic(opt.id)}
                    className={`rounded-xl py-3 font-medium border transition ${
                      music === opt.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Gift color */}
              <p className="text-sm font-medium text-gray-700 mt-6 mb-2 font-['Anonymous_Pro']">
                Gift color
              </p>
              <div className="flex gap-3">
                {GIFT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setGiftColor(c.value)}
                    className={`h-10 w-10 rounded-full border ${
                      giftColor === c.value ? "border-black" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.value }}
                    aria-label={c.name}
                    title={c.name}
                  />
                ))}
              </div>

              {/* Card color */}
              <p className="text-sm font-medium text-gray-700 mt-6 mb-2 font-['Anonymous_Pro']">
                Card color
              </p>
              <div className="flex gap-3">
                {CARD_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCardColor(c.value)}
                    className={`h-10 w-10 rounded-full border ${
                      cardColor === c.value ? "border-black" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.value }}
                    aria-label={c.name}
                    title={c.name}
                  />
                ))}
              </div>

              {/* Preview */}
              <div className="mt-6 rounded-2xl p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3 font-['Anonymous_Pro']">Preview</p>

                <div className="flex items-center gap-4">
                  <div
                    className="h-14 w-14 rounded-2xl shadow-sm"
                    style={{ backgroundColor: giftColor }}
                  />

                  <div
                    className="flex-1 rounded-2xl p-3"
                    style={{ backgroundColor: cardColor }}
                  >
                    <p className="text-sm font-semibold">€{base.amount}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {base.message || "Your message..."}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 font-['Anonymous_Pro']">Music: {music}</p>
              </div>
              </div>

              {/* Buttons bottom (zelfde vibe als Create) */}
              <div className="mt-auto pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="w-1/2 rounded-4xl py-4 font-medium border border-gray-200 font-['Rowdies']"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={goPreview}
                  className="w-1/2 rounded-4xl py-4 font-medium bg-[#53ccff]  text-white hover:disabled:opacity-50 font-['Rowdies'] "
                >
                  Preview
                </button>
              </div>
            </div>
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
