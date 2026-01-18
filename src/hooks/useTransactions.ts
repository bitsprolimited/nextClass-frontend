import { getPayments } from "@/services/payments.service";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { PaymentItem } from "@/types/transactions";

// Typed keys
type TransactionsKey = ["transactions"];
type TransactionKey = ["transaction", string];

/** Fetch all payments - simple wrapper like useTutors */
export function useTransactions<TData = PaymentItem[]>(
  options?: Omit<
    UseQueryOptions<PaymentItem[], Error, TData, TransactionsKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<PaymentItem[], Error, TData, TransactionsKey>({
    queryKey: ["transactions"],
    queryFn: getPayments,
    refetchOnWindowFocus: false,
    retry: false,
    ...(options ?? {}),
  });
}

/** Fetch one payment by id (enabled when id is provided) */
export function useTransaction<TData = PaymentItem>(
  id: string,
  options?: Omit<
    UseQueryOptions<PaymentItem, Error, TData, TransactionKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, Error> {
  return useQuery<PaymentItem, Error, TData, TransactionKey>({
    queryKey: ["transaction", id],
    // queryFn: () => getPayment(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
    ...(options ?? {}),
  });
}