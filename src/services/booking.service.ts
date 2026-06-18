import { RecentlyCalledTutor } from "@/components/parents/recentlyCalledTutors";
import axiosInstance from "@/lib/axios";
import { Child, Teacher, User } from "@/types";

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
  meetingLink?: string;
}

export interface Booking {
  _id: string;
  parentId: string;
  teacherId: string | Teacher;
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
  sessionStartedAt?: string;
  sessionEndedAt?: string;
  sessionEndedReason?: "host_ended" | "time_expired";
  attendance?: MeetingAttendanceEntry[];
  whiteboardScene?: Record<string, unknown>;
  whiteboardUpdatedAt?: string;
  whiteboardUpdatedBy?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  teacher?: User;
  parent?: User;
  learners?: Child[];
}

export interface MeetingAttendanceEntry {
  userId: string;
  role: "parent" | "teacher";
  firstJoinedAt?: string | null;
  lastJoinedAt?: string | null;
  lastLeftAt?: string | null;
  isPresent: boolean;
  reconnectCount: number;
  totalConnectedSeconds: number;
}

export interface MeetingAccessResponse {
  meetingLink: string;
  serverNow: string;
  startTime: string;
  endTime: string;
  joinWindowStartsAt: string;
  canJoin: boolean;
  isEnrolled: boolean;
  isSessionStarted: boolean;
  isSessionEnded: boolean;
  isWithinJoinWindow: boolean;
  shouldShowWaitingRoom: boolean;
  hasActiveAttendance: boolean;
  bookingStatus: BookingStatus;
  sessionStartedAt?: string | null;
  sessionEndedAt?: string | null;
  sessionEndedReason?: "host_ended" | "time_expired" | null;
  serverTimeOffsetMs: number;
  denyReason?: string | null;
  message: string;
  attendance: MeetingAttendanceEntry[];
}

export interface WhiteboardStateResponse {
  scene?: Record<string, unknown> | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
}

export interface WhiteboardSocketTokenResponse {
  token: string;
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

export const rescheduleBooking = async (
  startTime: Date,
  bookingId: string
): Promise<Booking> => {
  const response = await axiosInstance.post(
    `/bookings/reschedule/${bookingId}`,
    { startTime }
  );
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

export async function getBookingByMeetingLink(
  meetingLink: string
): Promise<Booking> {
  const response = await axiosInstance.get(`/bookings/meeting/${meetingLink}`);
  return response.data;
}

export async function getMeetingAccess(
  meetingLink: string
): Promise<MeetingAccessResponse> {
  const response = await axiosInstance.get(
    `/bookings/meeting/${meetingLink}/access`
  );
  return response.data;
}

export async function joinMeetingSession(
  meetingLink: string
): Promise<MeetingAccessResponse> {
  const response = await axiosInstance.post(`/bookings/meeting/${meetingLink}/join`);
  return response.data;
}

export async function leaveMeetingSession(
  meetingLink: string
): Promise<MeetingAccessResponse> {
  const response = await axiosInstance.post(`/bookings/meeting/${meetingLink}/leave`);
  return response.data;
}

export async function endMeetingSession(
  meetingLink: string
): Promise<MeetingAccessResponse> {
  const response = await axiosInstance.post(`/bookings/meeting/${meetingLink}/end`);
  return response.data;
}

export async function getWhiteboardState(
  meetingLink: string
): Promise<WhiteboardStateResponse> {
  const response = await axiosInstance.get(
    `/bookings/meeting/${meetingLink}/whiteboard`
  );
  return response.data;
}

export async function updateWhiteboardState(
  meetingLink: string,
  scene: Record<string, unknown>
): Promise<WhiteboardStateResponse> {
  const response = await axiosInstance.patch(
    `/bookings/meeting/${meetingLink}/whiteboard`,
    { scene }
  );
  return response.data;
}

export async function getWhiteboardSocketToken(
  meetingLink: string
): Promise<WhiteboardSocketTokenResponse> {
  const response = await axiosInstance.get(
    `/bookings/meeting/${meetingLink}/whiteboard-token`
  );
  return response.data;
}
