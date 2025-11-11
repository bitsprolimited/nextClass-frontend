// hooks/usePayment.ts
import axiosInstance from '@/lib/axios';
import { BookingType, EventType } from '@/services/booking.service';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface CreateCheckoutSessionData {
  teacherId: string;
  slots: Array<{ startTime: Date; duration: number }>;
  subject: string;
  learnerIds?: string[];
  bookingType: BookingType;
  eventType: EventType
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (data: CreateCheckoutSessionData) => {
      const response = await axiosInstance.post('/payment/create-checkout-session', data);
      return response.data;
    },
  });
}

export function useCheckoutSession(sessionId: string | null) {
  return useQuery({
    queryKey: ['checkout-session', sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      const response = await axiosInstance.get(`/payment/checkout-session/${sessionId}`);
      return response.data;
    },
    enabled: !!sessionId,
  });
}
