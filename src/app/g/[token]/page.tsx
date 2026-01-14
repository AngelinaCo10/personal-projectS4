import { supabaseServer } from "@/lib/supabaseServer";
import GiftAnimation from "@/components/GiftAnimation";

type Gift = {
  sender_name: string;
  message: string;
  amount_cents: number;
  currency: string;
  sent_at: string | null;
};

export default async function GiftPage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;

  const supabase = supabaseServer();
  const { data: gift, error } = await supabase
    .from("gift_cards")
    .select("sender_name,message,amount_cents,currency,sent_at")
    .eq("claim_token", token)
    .maybeSingle<Gift>();

  // ---------- Error UI (zelfde vibe) ----------
  if (error) {
    return (
      <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-[#53ccff] md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
          <div className="mt-[60px] flex items-center justify-center">
            <h1 className="text-[48px] text-white font-rowdies text-center font-['Rowdies']">
              GIFTY
            </h1>
          </div>

          <div className="flex-1 flex">
            <div className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col">
              <h2 className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 text-[#53ccff] font-['Rowdies']">
                Oeps
              </h2>
              <p className="text-start ml-3 text-gray-600 mb-6 font-['Anonymous_Pro']">
                Er ging iets mis met laden.
              </p>

              <div className="p-4 bg-white rounded-3xl shadow-[0px_4px_13px_0px_rgba(94,204,255,1.00)] border border-neutral-400">
                <p className="text-sm text-gray-700 font-['Anonymous_Pro']">
                  {error.message}
                </p>
                <p className="mt-3 text-xs text-gray-500 font-['Anonymous_Pro']">
                  Token: {token}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-[#53ccff] md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
          <div className="mt-[60px] flex items-center justify-center">
            <h1 className="text-[48px] text-white font-rowdies text-center font-['Rowdies']">
              GIFTY
            </h1>
          </div>

          <div className="flex-1 flex">
            <div className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col">
              <h2 className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 text-[#53ccff] font-['Rowdies']">
                Niet gevonden
              </h2>
              <p className="text-start ml-3 text-gray-600 mb-6 font-['Anonymous_Pro']">
                Deze link is ongeldig of het cadeau bestaat niet.
              </p>

              <div className="p-4 bg-white rounded-3xl shadow-[0px_4px_13px_0px_rgba(94,204,255,1.00)] border border-neutral-400">
                <p className="text-xs text-gray-500 font-['Anonymous_Pro']">
                  Token: {token}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const amountLabel = `€ ${(gift.amount_cents)}`;

  // ---------- Success UI (receiver) ----------
  return (
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
            <h2 className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 text-[#53ccff] font-['Rowdies']">
              Surprise!
            </h2>
            <p className="text-start ml-3 text-gray-600  font-['Anonymous_Pro']">
              Klik op het cadeau om het te openen.
            </p>
                <p className="flex mt-5 ml-3 text-2xl text-gray-700 font-['Anonymous_Pro']">
                  <span className="text-2xl text-gray-900 mr-3">From:</span>{" "}
                  {gift.sender_name}
                </p>

            {/* Cadeau container (zelfde kaart-stijl als je customize page box) */}
            <div className="p-4 flex flex-col h-70 mt-5 bg-white relative shadow-[0px_4px_13px_0px_rgba(94,204,255,1.00)] border border-neutral-400 mb-6">
              



                <p className="mt-4 text-sm font-semibold text-gray-900 font-['Anonymous_Pro']">
                  {/* Bericht */}
                </p>
                <p className="mt-1 text-2xl text-gray-700 whitespace-pre-wrap font-['Anonymous_Pro']">
                  {gift.message}
                </p>
                {/* <p className="mt-2 text-sm text-gray-700 font-['Anonymous_Pro']">
                  <span className="font-semibold text-gray-900">Bedrag:</span>{" "}
                  {amountLabel}
                </p> */}
              
            </div>
              <div className="mt-10 flex justify-center items-center py-2 h-80 ">
                <GiftAnimation amountLabel={amountLabel} />
              </div>
                <p className="mt-4 text-xs flex justify-center text-gray-500 font-['Anonymous_Pro']">
                  Verstuurd op:{" "}
                  {gift.sent_at
                    ? new Date(gift.sent_at).toLocaleString("nl-NL")
                    : "—"}
                </p>

            {/* Geen bottom buttons, dus gewoon opvullen */}
            <div className="mt-auto" />
          </div>
        </div>
      </main>
    </div>
  );
  
}


