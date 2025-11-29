import axiosInstance from "@/lib/axios";
import { PaymentRecord } from "@/types";

export const getMyPayments = async (): Promise<PaymentRecord[]> => {
  const response = await axiosInstance.get("/payment/me");
  return response.data;
};
