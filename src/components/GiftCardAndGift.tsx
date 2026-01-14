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

export default function GiftCardAndGift({
    senderName,
    message,
    amountLabel,
    giftColor,
    cardColor,
    variant = "receiver",
}: Props) {
    return (
        <>
            <h2
                className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 font-['Rowdies'] text-[#53ccff]"
                style={{ color: giftColor }}
            >
                {variant === "preview" ? (
                    <>
                        Gift ready to go?
                        <br />
                        {/* Surprise!
                        <br /> A Gifty for you */}

                    </>
                ) : (
                    <>

                    </>
                )}
            </h2>

            <p className="flex mt-5 ml-3 text-2xl text-gray-700 font-['Anonymous_Pro']">
                <span className="text-2xl text-gray-900 mr-3 ">From:</span>{" "}
                {senderName}
            </p>

            <p className="text-start ml-3 text-gray-600 font-['Anonymous_Pro'] ">
                {variant === "preview" ? (
                    <>A message and a gift for you.
                        <br />
                        Click on the gift to open it.
                    </>
                ) : (
                    <>
                        A message and a gift for you.
                        <br />
                        Click on the gift to open it.
                    </>
                )}
            </p>

            {/* Message box */}
            <div
                className="p-4 flex flex-col h-50 mt-5 relative mb-6 shadow-[0px_4px_13px_0px_rgba(165,165,165,1.00)]"
                style={{
                    backgroundColor: cardColor,
                    border: `1px solid ${cardColor}`,
                }}
            >
                <p className="mt-1 text-2xl text-gray-700 whitespace-pre-wrap font-['Anonymous_Pro']">
                    {message}
                </p>
            </div>

            <div className="mt-10 flex justify-center items-center py-2 h-40 scale-75">
                <GiftAnimation amountLabel={amountLabel} giftColor={giftColor} />
            </div>
        </>
    );
}
