"use client";

import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";
import SearchAndFilter from "@/components/parents/searchFilter";
import TransactionsHistory from "@/components/parents/transactionHistory";
import { getMyPayments } from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";

export const Transaction = (): JSX.Element => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getMyPayments(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorComponent />;

  return (
    <div className="flex flex-col gap-10 py-[60px] items-center justify-center w-full max-w-6xl mx-auto">
      <SearchAndFilter />
      <TransactionsHistory transactions={transactions || []} />
    </div>
  );
};
