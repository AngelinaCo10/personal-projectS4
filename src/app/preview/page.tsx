"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import GiftCardAndGift from "@/components/GiftCardAndGift";

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

export default function PreviewPage() {
    const sp = useSearchParams();
    const router = useRouter();

    const data = useMemo(() => {
        return {
            senderName: sp.get("senderName") ?? "",
            message: sp.get("message") ?? "",
            amount: Number(sp.get("amount") ?? "10"),
            giftColor: sp.get("giftColor") ?? "#ff4fa3",
            cardColor: sp.get("cardColor") ?? "#ffffff",
        };
    }, [sp]);

    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ modal state
    const [confirmOpen, setConfirmOpen] = useState(false);

    async function onSend() {
        setSending(true);
        setError(null);

        const token = crypto.randomUUID();

        const res = await fetch("/api/gift", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_name: data.senderName,
                message: data.message,
                amount_cents: data.amount,
                currency: "EUR",
                claim_token: token,
                gift_color: data.giftColor,
                card_color: data.cardColor,
            }),
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json?.error ?? "Something went wrong");
            setSending(false);
            return;
        }

        router.push(`/sent?token=${encodeURIComponent(json.token)}`);
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

                    {/* Sheet */}
                    <div className="flex-1 flex">
                        <div className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col">
                            <button
                                type="button"
                                onClick={() => setConfirmOpen(true)}
                                className="self-end rounded-xl px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200"
                            >
                                X
                            </button>

                            {/* Preview kleiner */}
                            <div className="flex justify-center">
                                <div className="origin-top w-full">
                                    <GiftCardAndGift
                                        senderName={data.senderName}
                                        message={data.message}
                                        amountLabel={`€ ${data.amount}`}
                                        giftColor={data.giftColor}
                                        cardColor={data.cardColor}
                                        variant="preview"
                                    />
                                </div>
                            </div>

                            <div className="mt-auto" />

                            {error && (
                                <p className="text-sm text-red-600 text-center mb-3">{error}</p>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="rounded-4xl py-4 font-medium border border-gray-300 text-gray-700 font-['Rowdies']"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={onSend}
                                    disabled={sending}
                                    className="rounded-4xl py-4 font-medium bg-[#53CCFF] text-white disabled:opacity-50 font-['Rowdies']"
                                >
                                    {sending ? "Sending…" : "Send gift"}
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
