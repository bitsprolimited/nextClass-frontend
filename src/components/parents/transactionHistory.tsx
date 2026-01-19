import { BookOpen, Calendar, Clock, CreditCard } from "lucide-react";
import Image from "next/image";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { PaymentRecord } from "@/types";
import { format } from "date-fns";

export default function TransactionsHistory({
  transactions,
}: {
  transactions: PaymentRecord[];
}) {
  return (
    <section className="w-full max-w-6xl mx-auto space-y-6 font-montserrat">
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
      {transactions.length > 0 ? (
        transactions.map((tx, index) => (
          <div
            key={index}
            className="bg-[#FBF8F3] rounded-xl p-4 lg:p-6 shadow-xs"
          >
            <div className="flex gap-6 items-start">
              {/* Image */}
              <div className="w-10 h-10 md:w-20 md:h-20 lg:w-36 lg:h-36 rounded-xl overflow-hidden border shrink-0">
                <Image
                  src={tx.teacherId.profilePicture || "/images/tutor-1.png"}
                  alt={tx.teacherId.fullName}
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
                    <h3 className="text-lg font-semibold font-aero-trial text-[#2c241b] capitalize">
                      {tx.teacherId.fullName}
                    </h3>
                  </div>
                  <span className="bg-[#BFE2CE] text-green-800 text-sm px-4 py-1 rounded-full font-medium self-center sm:self-end">
                    {tx.status}
                  </span>
                </div>

                {/* Bottom row: Icons and info */}
                <div className="flex flex-wrap gap-3 lg:gap-10 pt-2">
                  {/* DateTime */}
                  <div className="flex items-center lg:items-start lg:flex-col gap-2 lg:gap-4 text-sm text-[#2c241b]">
                    <Calendar className="w-5 h-5" />
                    <span className="text-center whitespace-nowrap">
                      {format(tx.createdAt, "Pp")}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="self-center text-[#ccc] text-lg">|</div>

                  {/* Type */}
                  <div className="flex items-center lg:items-start lg:flex-col gap-2 lg:gap-4 text-sm text-[#2c241b]">
                    <Clock className="w-5 h-5" />
                    <span>{tx.type}</span>
                  </div>

                  {/* Divider */}
                  <div className="self-center text-[#ccc] text-lg">|</div>

                  {/* Ref */}
                  <div className="flex items-center lg:items-start lg:flex-col gap-2 lg:gap-4 text-sm text-[#2c241b]">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-center break-all w-fit">
                      {tx.stripePaymentIntentId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty className="">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-transparent">
              <CreditCard />
            </EmptyMedia>
            <EmptyTitle>No Transaction History</EmptyTitle>
            <EmptyDescription>You have no transaction history</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
