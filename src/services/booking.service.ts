import axiosInstance from "@/lib/axios";

export interface CreateBooking {
  teacherId: string;
  learnerIds?: string[];
  slots: { startTime: Date; duration: number }[];
  endTime: string;
  eventType: "introduction_call" | "class" | string;
  subject?: string;
  description?: string;
  hourlyRate?: number;
  bookingType: "one_time" | "recurring";
}

export interface Booking {
  _id: string;
  parentId: string;
  teacherId: string;
  learnerIds: string[];
  startTime: string;
  endTime: string;
  duration: number;
  status: "pending" | "confirmed" | "cancelled";
  type: "one_time" | "recurring";
  eventType: "introduction_call" | "class" | string;
  totalAmount: number;
  platformFeePercentage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// The full API response
export interface CreateBookingResponse {
  message: string;
  data: Booking;
}

export const createBooking = async (
  data: CreateBooking
): Promise<CreateBookingResponse> => {
  const response = await axiosInstance.post("/bookings", data);
  return response.data;
};
