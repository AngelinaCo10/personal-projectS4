"use client";

import GiftAnimation from "@/components/GiftAnimation";

type Props = {
  senderName: string;
  message: string;
  amountLabel: string;
  giftColor: string;
  cardColor: string;
  variant?: "receiver" | "preview";
};

export default function GiftContent({
  senderName,
  message,
  amountLabel,
  giftColor,
  cardColor,
  variant = "receiver",
}: Props) {
  return (
    <>
      {/* Card */}
      <div
        className="mb-auto h-70 p-6 border-neutral-400"
        style={{ backgroundColor: cardColor }}
      >
        <p className="text-3xl font-semibold mb-2 font-['anonymous_pro']">
          From: {senderName}
        </p>
        <p className="text-gray-800 whitespace-pre-wrap">{message}</p>
      </div>

      {/* Gift area */}
      <div className="w-full bg-white p-6 shadow-sm">
        <div className="flex justify-center">
          {variant === "preview" ? (
            // Preview: statisch blokje (of je kunt GiftAnimation laten staan)
            <div
              className="w-44 h-32 rounded-2xl shadow-xl flex items-end justify-center"
              style={{ backgroundColor: giftColor }}
            >
              <span className="mb-3 bg-black text-white px-4 py-2 rounded-4xl text-sm font-semibold">
                {amountLabel}
              </span>
            </div>
          ) : (
            // Receiver: echte animatie
            <GiftAnimation amountLabel={amountLabel} giftColor={giftColor} />
          )}
        </div>
      </div>
    </>
  );
}
