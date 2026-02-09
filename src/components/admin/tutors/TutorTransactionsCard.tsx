"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentItem } from "@/types/transactions";

export default function TutorTransactionsCard({
  transactions,
}: {
  transactions?: PaymentItem[];
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
          
          // Extract PaymentItem fields with safe type checking
          const id = transaction.id || transaction._id || `txn-${idx}`;
          const referenceId = transaction.referenceId || transaction.id || "-";
          const amount = transaction.amount;
          const amountDisplay = typeof amount === "number"
            ? `₦${amount.toLocaleString()}`
            : typeof amount === "string"
            ? amount
            : "—";
          
          const status = transaction.status || "Unknown";
          const dateTime = transaction.createdAt || transaction.dateTime || "-";
          
          // Extract participant information from different possible structures
          const participants = transaction.participants || [];
          let tutorName = "-";
          let learnerName = "-";
          
          if (Array.isArray(participants)) {
            participants.forEach((p: any) => {
              const role = p?.role || p?.type || "";
              const name = p?.name || p?.fullName || "";
              if (role?.toLowerCase?.()?.includes("tutor")) {
                tutorName = name;
              } else if (role?.toLowerCase?.()?.includes("learner") || role?.toLowerCase?.()?.includes("student")) {
                learnerName = name;
              }
            });
          }

          // Extract from teacher/parent if participants not available
          if (tutorName === "-" && transaction.teacher) {
            tutorName = typeof transaction.teacher === "object" 
              ? (transaction.teacher as any).fullName || (transaction.teacher as any).name || "-"
              : String(transaction.teacher);
          }
          if (learnerName === "-" && transaction.parent) {
            learnerName = typeof transaction.parent === "object"
              ? (transaction.parent as any).fullName || (transaction.parent as any).name || "-"
              : String(transaction.parent);
          }

          return (
            <div
              key={id}
              className="bg-[#F5F4F8] rounded-xl px-3 py-3 transition-all"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">
                  Session {id}
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
                <p>Reference {referenceId}</p>
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
