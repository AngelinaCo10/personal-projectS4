import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#5ECCFF] md:bg-gray-200 md:flex md:justify-center md:py-10 ">
      <main className="relative min-h-screen w-screen  bg-[#5ECCFF] p-6 md:w-full md:max-w-[390px] md:rounded-2xl md:shadow-xl md:overflow-hidden flex flex-col">
        
        {/* GIFTY gecentreerd */}
        <h1 className="text-5xl text-white font-rowdies text-center mb-6 mt-16">
          GIFTY
        </h1>

        {/* Center area */}
        <div className="flex-1 flex items-center justify-center items-center">
          <div className=" w-80 h-80 bg-white rounded-[60px] p-6 text-center max-w-sm items-center">
            <h2 className="text-4xl font-semibold mb-2 text-[#5ECCFF] mt-5 font-rowdies">
              Send your Gifty
            </h2>
            <p className="text-gray-600">
              Write a card message, choose an amount and send it to your friends and family digitally!
            </p>
          </div>
        </div>

        {/* Button onderaan */}
        <Link
          href="/create"
          className="hover:bg-[#303030] hover:text-white mt-6 block w-full text-center bg-white text-[#5ECCFF] py-4 rounded-4xl font-medium"
        >
          Make your gift
        </Link>

      </main>
    </div>
  );
}
