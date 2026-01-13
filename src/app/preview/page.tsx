"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function PreviewPage() {
    const sp = useSearchParams();

    /* ---------------- data from previous steps ---------------- */
    const data = useMemo(() => {
        return {
            senderName: sp.get("senderName") ?? "",
            message: sp.get("message") ?? "",
            amount: Number(sp.get("amount") ?? "10"),
            giftColor: sp.get("giftColor") ?? "#ff4fa3",
            cardColor: sp.get("cardColor") ?? "#ffffff",
        };
    }, [sp]);

    /* ---------------- send / share state ---------------- */
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* ---------------- helpers ---------------- */
    async function copyLink() {
        if (!shareUrl) return;
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    function openWhatsApp() {
        if (!shareUrl) return;
        const text = `You got a GIFTY! 🎁 Open it here: ${shareUrl}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    }

    async function nativeShare() {
        if (!shareUrl) return;

        if (navigator.share) {
            await navigator.share({
                title: "GIFTY",
                text: "You got a GIFTY! 🎁",
                url: shareUrl,
            });
        } else {
            await copyLink();
            alert("Share not supported — link copied");
        }
    }

    /* ---------------- SEND: create token + insert ---------------- */
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

                
            }),
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json?.error ?? "Something went wrong");
            setSending(false);
            return;
        }

        const url = `${window.location.origin}/g/${json.token}`;
        setShareUrl(url);
        setSent(true);
        setSending(false);
    }

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
            <main className="min-h-screen w-screen bg-[#53ccff] p-6 md:max-w-[390px] md:rounded-2xl md:shadow-xl flex flex-col">

                {/* Header */}
                <h1 className="mt-[60px] text-[48px] text-white font-rowdies text-center font-['Rowdies']">
                    GIFTY
                </h1>

                {/* Preview */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full space-y-6">


                        {/* Card preview */}
                        <div
                            className="mb-auto h-80 p-6   border-neutral-400"
                            style={{ backgroundColor: data.cardColor }}
                        >
                            <p className="text-3xl font-semibold mb-2 font-['anonymous_pro']">
                                From: {data.senderName}
                            </p>
                            <p className="text-gray-800">
                                {data.message}
                            </p>
                        </div>
                        <div className="w-full bg-white p-6 shadow-sm ">

                            {/* Gift preview */}
                            <div className="flex justify-center">
                                <div
                                    className="w-44 h-32 rounded-2xl shadow-xl flex items-end justify-center"
                                    style={{ backgroundColor: data.giftColor }}
                                >
                                    <span className="mb-3 bg-black text-white px-4 py-2 rounded-4xl text-sm font-semibold">
                                        €{data.amount}
                                    </span>
                                </div>
                            </div>


                            {/* Error */}
                            {error && (
                                <p className="text-sm text-red-600 text-center">
                                    {error}
                                </p>
                            )}
                        </div>
                        {/* Actions */}
                        {!sent ? (
                            <button
                                onClick={onSend}
                                disabled={sending}
                                className="w-full bg-black text-white py-4 rounded-4xl font-medium disabled:opacity-50 font-['Rowdies']"
                            >
                                {sending ? "Sending…" : "Send gift 🎁"}
                            </button>
                        ) : (
                            <div className="bg-white rounded-2xl p-5">
                                <h3 className="text-lg font-semibold text-center mb-1">
                                    Sent! 🎉
                                </h3>
                                <p className="text-center text-gray-600 mb-4">
                                    Share the link with your friend
                                </p>

                                <div className="rounded-xl border px-4 py-3 text-sm break-all">
                                    {shareUrl}
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <button
                                        onClick={openWhatsApp}
                                        className="rounded-2xl py-3 bg-green-600 text-white"
                                    >
                                        💬
                                    </button>

                                    <button
                                        onClick={copyLink}
                                        className="rounded-2xl py-3 border"
                                    >
                                        {copied ? "Copied!" : "📋"}
                                    </button>

                                    <button
                                        onClick={nativeShare}
                                        className="mt-auto rounded-2xl py-3 bg-black text-white"
                                    >
                                        📤
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* <Link
              href={`/create/customize?${sp.toString()}`}
              className="block text-center text-white/80 text-sm"
            >
              Edit
            </Link> */}


                    </div>
                </div>
            </main>
        </div>
    );
}
