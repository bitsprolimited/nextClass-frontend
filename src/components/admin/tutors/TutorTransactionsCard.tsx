"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/constants";

export default function TutorTransactionsCard({
  transactions,
}: {
  transactions?: Transaction[];
}) {
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(
    null
  );

  const toggleTransaction = (index: number) =>
    setExpandedTransaction(expandedTransaction === index ? null : index);

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6 h-[400px] overflow-y-auto rounded-2xl shadow-sm bg-white">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Transactions
        </h2>
        <div className="text-sm text-gray-500">No transactions yet.</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-[400px] overflow-y-auto rounded-2xl shadow-sm bg-white">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Transactions
      </h2>

      <div className="space-y-3">
        {transactions.map((transaction, idx) => {
          const isOpen = expandedTransaction === idx;
          // treat transaction as unknown and narrow each field safely
          const tx = transaction as unknown as Record<string, unknown>;

          const amountDisplay =
            typeof tx.amount === "string"
              ? tx.amount
              : typeof tx.price === "number"
              ? `₦${(tx.price as number).toLocaleString()}`
              : "—";

          const status = typeof tx.status === "string" ? tx.status : "Unknown";
          const reference =
            typeof tx.reference === "string" ? tx.reference : "-";
          const dateTime = typeof tx.dateTime === "string" ? tx.dateTime : "-";
          const tutorName = typeof tx.tutor === "string" ? tx.tutor : "-";
          const learnerName = typeof tx.learner === "string" ? tx.learner : "-";
          const grade = typeof tx.grade === "string" ? tx.grade : "";
          const subject = typeof tx.subject === "string" ? tx.subject : "";
          const sessions =
            typeof tx.sessions === "number" || typeof tx.sessions === "string"
              ? String(tx.sessions)
              : "";

          return (
            <div
              key={transaction.id ?? idx}
              className="bg-[#F5F4F8] rounded-xl px-3 py-3 transition-all"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">
                  Session {transaction.id}
                </p>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-semibold text-sm">
                    {amountDisplay}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-600 text-[10px] font-medium mt-1"
                  >
                    {status}
                  </Badge>
                </div>
              </div>

              {/* Middle Info */}
              <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                <p>Reference {reference}</p>
                <p>{dateTime}</p>
              </div>

              {/* Expanded Info */}
              {isOpen && (
                <div className="mt-3 text-[11px] text-gray-600 space-y-1 border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span>
                      Tutor:{" "}
                      <span className="font-medium text-gray-800">
                        {tutorName}
                      </span>
                    </span>
                    <span>
                      Learner:{" "}
                      <span className="font-medium text-gray-800">
                        {learnerName}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-1 items-center text-gray-500">
                    <span>{grade}</span>
                    {subject && (
                      <>
                        <span>•</span>
                        <span>{subject}</span>
                      </>
                    )}
                    {sessions && (
                      <>
                        <span>•</span>
                        <span>{sessions}</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center mt-1">
                <button
                  className="text-gray-400 hover:text-gray-600 transition"
                  onClick={() => toggleTransaction(idx)}
                  aria-label={
                    isOpen ? "Collapse transaction" : "Expand transaction"
                  }
                >
                  {isOpen ? (
                    <ChevronUp size={16} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={16} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
