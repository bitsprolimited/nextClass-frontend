import axiosInstance from "@/lib/axios";
import { createBooking } from "@/services/booking.service";
import { useModalStore } from "@/store/useModal";
import { AxioErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface BookingSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number;
}

export interface RecurringSlot {
  startTime: string; // ISO string
  endTime: string; // ISO string
}

export interface RecurrenceConfig {
  pattern: "daily" | "weekly" | "biweekly" | "monthly";
  occurrences?: number;
  endDate?: string; // ISO string
  daysOfWeek?: number[];
}

export interface CreateSingleBookingRequest {
  teacherId: string;
  learnerIds?: string[];
  eventType: "introduction_call" | "class";
  startTime: string; // ISO string
  duration: number;
  subject?: string;
  description?: string;
  hourlyRate?: number;
}

export interface CreateRecurringBookingRequest {
  teacherId: string;
  learnerIds?: string[];
  eventType: "introduction_call" | "class";
  recurringSlots: RecurringSlot[];
  duration: number;
  subject?: string;
  description?: string;
  hourlyRate?: number;
  recurrence: RecurrenceConfig;
}

export interface ValidateRecurringRequest {
  teacherId: string;
  slots: BookingSlot[];
}

export interface BookingSlotValidation {
  date: Date;
  time: string;
  available: boolean;
  conflictReason?: string;
}

export interface RecurringBookingValidation {
  validSlots: BookingSlotValidation[];
  conflictSlots: BookingSlotValidation[];
  totalSlots: number;
}

export const useCreateBooking = () => {
  const { openModal } = useModalStore();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      openModal("success", {
        title: "Call Booked",
        highlight: "Successfully",
        message:
          "You have successfully have successfully booked a call with th tutor",
        buttonText: "Proceed",
      });
      toast.success("Booking created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create booking");
      console.error("Submit error:", error);
    },
  });
};

export function useValidateRecurringBooking() {
  return useMutation({
    mutationFn: async (
      data: ValidateRecurringRequest
    ): Promise<RecurringBookingValidation> => {
      const response = await axiosInstance.post("/bookings/validate-recurring", data);
      return response.data;
    },
    onError: (error: AxiosError<AxioErrorResponse>) => {
      const message =
        error.response?.data?.message || "Failed to validate booking slots";
      toast.error(message);
    },
  });
}

