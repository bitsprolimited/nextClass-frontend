import { BookOpen, Calendar, Clock } from "lucide-react";
import Image from "next/image";

const transactions = [
  {
    name: "James Patterson",
    day: "Mon, May 26",
    time: "9:00am - 9:30",
    dateTime: "16/06/2025 9:00am - 9:30",
    type: "Transfer",
    ref: "123163ye657dbhwbdbjjk",
    status: "Paid",
    image: "/images/avatar-1.png",
  },
  {
    name: "James Patterson",
    day: "Mon, May 26",
    time: "9:00am - 9:30",
    dateTime: "16/06/2025 9:00am - 9:30",
    type: "Transfer",
    ref: "123163ye657dbhwbdbjjk",
    status: "Paid",
    image: "/images/avatar-1.png",
  },
];

export default function TransactionsHistory() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-semibold text-[#2c241b]">
          Transactions History
        </h2>
        <button className="text-sm font-medium text-[#031D95] hover:underline">
          View All
        </button>
      </div>

      {/* Transaction Cards */}
      {transactions.map((tx, index) => (
        <div
          key={index}
          className="bg-[#FBF8F3] rounded-xl px-6 py-6 shadow-sm"
        >
          <div className="flex gap-6 items-start">
            {/* Image */}
            <div className="w-[144px] h-[144px] rounded-xl overflow-hidden border shrink-0">
              <Image
                src="/Images/tutor-3.png"
                alt={tx.name}
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col w-full gap-4">
              {/* Top row: Name + Date/Time + Status */}
              <div className="flex justify-between items-start flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-[#2c241b]">
                    {tx.name}
                  </h3>
                  <div className="flex gap-2">
                    <BookOpen className="w-5 h-5 " />

                    <p className="text-sm text-[#2c241b]">{tx.day}</p>
                  </div>
                  <p className="text-sm text-[#6e6e6e]">{tx.time}</p>
                </div>
                <span className="bg-[#BFE2CE] text-green-800 text-sm px-4 py-1 rounded-full font-medium self-center sm:self-end">
                  {tx.status}
                </span>
              </div>

              {/* Bottom row: Icons and info */}
              <div className="flex gap-10 pt-2">
                {/* DateTime */}
                <div className="flex flex-col text-sm text-[#2c241b]">
                  <Calendar className="w-5 h-5 mb-1" />
                  <span className="text-center whitespace-nowrap">
                    {tx.dateTime}
                  </span>
                </div>

                {/* Divider */}
                <div className="self-center text-[#ccc] text-lg">|</div>

                {/* Type */}
                <div className="flex flex-col  text-sm text-[#2c241b]">
                  <Clock className="w-5 h-5 mb-1" />
                  <span>{tx.type}</span>
                </div>

                {/* Divider */}
                <div className="self-center text-[#ccc] text-lg">|</div>

                {/* Ref */}
                <div className="flex flex-col  text-sm text-[#2c241b]">
                  <BookOpen className="w-5 h-5 mb-1" />
                  <span className="break-all text-center">{tx.ref}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
