"use client";

import SearchAndFilter from "@/components/parents/searchFilter";
import TransactionsHistory from "@/components/parents/transactionHistory";
import { JSX } from "react";

export const Transaction = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-10 py-[60px] items-center justify-center w-full max-w-6xl mx-auto">
      <SearchAndFilter />
      <TransactionsHistory />
    </div>
  );
};
