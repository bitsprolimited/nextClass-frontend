import axiosInstance from "@/lib/axios";
import type { PaymentItem } from "@/types/transactions";

/** Fetch all payments */
export const getPayments = async (): Promise<PaymentItem[]> => {
  const response = await axiosInstance.get("/payment");
  if (Array.isArray(response.data)) return response.data as PaymentItem[];
  return (response.data && Array.isArray(response.data.data)) ? response.data.data : [];
};

/** Fetch one payment by id */
export const getPayment = async (id: string): Promise<PaymentItem | null> => {
  const response = await axiosInstance.get(`/payment/${encodeURIComponent(id)}`);
  const body = response.data;
  // backend might return item directly or wrapped in { data: item }
  if (body && typeof body === "object" && "data" in body) return body.data ?? null;
  return (body as PaymentItem) ?? null;
};