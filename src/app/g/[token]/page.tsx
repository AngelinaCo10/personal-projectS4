import { supabaseServer } from "@/lib/supabaseServer";
import GiftAnimation from "@/components/GiftAnimation";

type Gift = {
  sender_name: string;
  message: string;
  amount_cents: number;
  currency: string;
  sent_at: string | null;
  card_color: string | null;
  gift_color: string | null;
};

export default async function GiftPage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;

  const supabase = supabaseServer();
  const { data: gift, error } = await supabase
    .from("gift_cards")
    .select("sender_name,message,amount_cents,currency,sent_at,card_color,gift_color")
    .eq("claim_token", token)
    .maybeSingle<Gift>();

  // fallback kleuren als ze null zijn
  const cardColor = gift?.card_color ?? "#ffffff";
  const giftColor = gift?.gift_color ?? "#53ccff";

  // ---------- Error UI ----------
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

  // ---------- Not found UI ----------
  if (!gift) {
    return (
      <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
        <main className="min-h-screen w-screen bg-[#53ccff] md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
          <div className="flex items-center justify-center">
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

  // LET OP: jouw amountLabel was nu € (amount_cents) zonder /100.
  // Als je amount_cents echt cents zijn, gebruik: gift.amount_cents / 100
  const amountEuros = gift.amount_cents; // pas aan naar gift.amount_cents / 100 als je cents opslaat
  const amountLabel = `€${amountEuros}`;

  // ---------- Success UI ----------
  return (
    <div className="min-h-screen bg-[#53ccff] md:bg-gray-200 md:flex md:justify-center md:py-10">
      <main className="min-h-screen w-screen md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col"
      style={{ backgroundColor: giftColor }}
      >


        {/* Header */}
        <div className="mt-[60px] flex items-center justify-center">
          <h1 className="text-[48px] text-white font-rowdies text-center font-['Rowdies']">
            GIFTY
          </h1>
        </div>

        {/* Sheet */}
        <div className="flex-1 flex">
          <div
            className="w-full flex-1 bg-white rounded-t-4xl p-6 shadow-sm flex flex-col"
          >
            <h2
              className="text-3xl font-semibold text-start ml-3 mt-3 mb-1 font-['Rowdies'] text-[#53ccff]"
            style={{ color: giftColor }}
            >
              A GIFTY for you!
              <br /> 
              {/* Surprise!
              <br /> A Gifty for you */}
            </h2>
            <p className="font-[ROWDIES] ml-3 text-2xl text-[#303030]">Click on gift</p>

            <p className="flex text-xl mt-5 ml-3 text-1xl text-gray-700 font-['Anonymous_Pro']">
              <span className="text-xl text-gray-900 mr-3">From:</span>{" "}
              {gift.sender_name}
            </p>

            <p className="text-start ml-3 text-gray-600 font-['Anonymous_Pro']">
              {/* A message and a gift for you.
              <br />
              Click on the gift to open it. */}
            </p>

            {/* Message box */}
            <div
            
              className="p-4 flex flex-col h-70 relative mt-2 mb-6 shadow-[0px_4px_13px_0px_rgba(165,165,165,1.00)] "
              style={{
                backgroundColor: `${cardColor}`,
                border: `1px solid ${cardColor}`,
              }}
              
            >
              
              <p className="mt-1 text-2xl text-gray-700 whitespace-pre-wrap font-['Anonymous_Pro']">
                {gift.message}
                
              </p>
              
            </div>

            <div className="mt-10 flex justify-center items-center py-2 h-40">
              {/* Als je GiftAnimation zelf ook kleur wilt geven: voeg prop toe */}
              <GiftAnimation amountLabel={amountLabel}
               giftColor={giftColor} 
                />
            </div>

            <p className="mt-4 text-xs flex justify-center text-gray-500 font-['Anonymous_Pro']">
              Send at :{" "}
              {gift.sent_at
                ? new Date(gift.sent_at).toLocaleString("nl-NL", {
                  timeZone: "Europe/Amsterdam",
                })
                : "—"}
            </p>

            <div className="mt-auto" />
          </div>
        </div>
      </main>
    </div>
  );
}
