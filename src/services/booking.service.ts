import { RecentlyCalledTutor } from "@/components/parents/recentlyCalledTutors";
import axiosInstance from "@/lib/axios";
import { Child, User } from "@/types";

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

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELED = "canceled",
  RESCHEDULED = "rescheduled",
}

export enum EventType {
  INTRODUCTION_CALL = "introduction_call",
  CLASS = "class",
}

export enum BookingType {
  ONE_TIME = "one_time",
  RECURRING = "recurring",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  START_TIME = "startTime",
  CREATED_AT = "createdAt",
  STATUS = "status",
  SUBJECT = "subject",
}

export interface GetBookingsParams {
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  status?: BookingStatus;
  eventType?: EventType;
  bookingType?: BookingType;
  subject?: string;
  teacherId?: string;
  learnerId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  statuses?: BookingStatus[];
}

export interface Booking {
  _id: string;
  parentId: string;
  teacherId: string;
  learnerIds: string[];
  startTime: string;
  endTime: string;
  duration: number;
  subject: string;
  status: BookingStatus;
  type: BookingType;
  eventType: EventType;
  totalAmount: number;
  meetingLink: string;
  platformFeePercentage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  teacher?: User;
  parent?: User;
  learners?: Child[];
}

export interface PaginatedBookingsResponse {
  data: Booking[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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

export async function getBookings(
  params?: GetBookingsParams
): Promise<PaginatedBookingsResponse> {
  const response = await axiosInstance.get("/bookings", { params });
  return response.data;
}

export async function getRecentlyCalled(params?: {
  limit?: number;
}): Promise<RecentlyCalledTutor[]> {
  const response = await axiosInstance.get("/bookings/recently-called", {
    params,
  });
  return response.data;
}

export async function acceptBooking(bookingId: string): Promise<Booking> {
  const response = await axiosInstance.post(`/bookings/accept/${bookingId}`);
  return response.data;
}
