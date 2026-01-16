"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SentClient() {
    const sp = useSearchParams();
    const token = sp.get("token") ?? "";

    const shareUrl = useMemo(() => {
        if (!token) return "";
        return `${window.location.origin}/g/${token}`;
    }, [token]);

    const [copied, setCopied] = useState(false);

    async function copyLink() {
        if (!shareUrl) return;
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    function openWhatsApp() {
        if (!shareUrl) return;
        const text = `You got a GIFTY! 🎁 Open it here: ${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
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

    return (
        <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
            <main className="min-h-screen w-screen bg-[#53ccff] p-6 md:max-w-[390px] md:rounded-2xl md:shadow-xl flex flex-col">
                <h1 className="] text-[48px] text-white font-rowdies text-center font-['Rowdies']">
                    GIFTY
                </h1>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full space-y-6 ">
                        <div className="bg-white rounded-4xl p-6 h-110 shadow-sm">
                            <h2 className="text-2xl font-semibold text-center mb-2 font-['Rowdies'] text-[#53CCFF]">
                                Your Gifty has been made!
                            </h2>

                            <p className="text-center text-gray-600 mb-5 font-['Anonymous_Pro']">
                                Share the link with the receiver of this gift:
                            </p>

                            {!token ? (
                                <p className="text-sm text-red-600 text-center">
                                    Geen token gevonden.
                                </p>
                            ) : (
                                <>
                                    {/* <div className="rounded-xl border px-4 py-3 text-sm break-all font-['Anonymous_Pro']">
                                         {shareUrl}
                                        </div> */}
                                    <div className="flex justify-center items-center">
                                        <div className="relative w-50 h-50">
                                            <Image
                                                src="/Gifts.svg"
                                                alt="Gift"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-center gap-4">
                                        {/* WhatsApp */}
                                        <button
                                            onClick={openWhatsApp}
                                            type="button"
                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border"
                                            aria-label="Share via WhatsApp"
                                        >
                                            <div className="relative w-5 h-5">
                                                <Image
                                                    src="/whatsapp-zwart.svg"
                                                    alt="WhatsApp"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </button>

                                        {/* Copy link */}
                                        <button
                                            onClick={copyLink}
                                            type="button"
                                            className="flex items-center justify-center w-12 h-12 rounded-full border"
                                            aria-label="Copy link"
                                        >
                                            <div className="relative w-5 h-5">
                                                <Image
                                                    src="/copy-icon.svg"
                                                    alt="Copy link"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </button>

                                        {/* Native share */}
                                        <button
                                            onClick={nativeShare}
                                            type="button"
                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border"
                                            aria-label="Share"
                                        >
                                            <div className="relative w-5 h-5">
                                                <Image
                                                    src="/share-icon.svg"
                                                    alt="Share"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                    
                                </>
                            )}
                            
                        </div>

                        {/* <Link href="/" className="block text-center text-white/90 text-sm font-[Rowdies]">
              Make another gift
            </Link> */}
            
                        <Link
                            href="/"
                            className="hover:bg-[#303030] hover:text-white mt-60 block w-full text-center bg-white text-[#5ECCFF] py-4 rounded-4xl font-medium font-[rowdies]"
                        >
                            Make another gift
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
