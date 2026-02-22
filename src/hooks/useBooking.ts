import {
  Booking,
  BookingStatus,
  createBooking,
  EventType,
  getBookings,
  GetBookingsParams,
  PaginatedBookingsResponse,
  rescheduleBooking,
} from "@/services/booking.service";
import { useModalStore } from "@/store/useModal";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (params?: GetBookingsParams) =>
    [...bookingKeys.lists(), params] as const,
  upcoming: (limit?: number) =>
    [...bookingKeys.all, "upcoming", limit] as const,
  stats: () => [...bookingKeys.all, "stats"] as const,
  detail: (id: string) => [...bookingKeys.all, "detail", id] as const,
};

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

export const useRescheduleBooking = () => {
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { startTime: Date; id: string }) =>
      rescheduleBooking(data.startTime, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      openModal("success", {
        title: "Call Rescheduled",
        highlight: "Successfully",
        message:
          "You have successfully have successfully booked a call with th tutor",
        buttonText: "Proceed",
      });
      toast.success("Booking rescheduled successfully");
    },
    onError: (error) => {
      toast.error("Failed to reschedule booking");
      console.error("Submit error:", error);
    },
  });
};

export function useBookings(
  params?: GetBookingsParams,
  options?: Omit<
    UseQueryOptions<PaginatedBookingsResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  const queryKey = bookingKeys.list(params);

  const query = useQuery({
    queryKey,
    queryFn: () => getBookings(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

  // Memoized computed values
  const computedValues = useMemo(() => {
    const bookings = query.data?.data || [];
    const pagination = query.data
      ? {
          total: query.data.total,
          page: query.data.page,
          limit: query.data.limit,
          totalPages: query.data.totalPages,
          hasNextPage: query.data.hasNextPage,
          hasPrevPage: query.data.hasPrevPage,
        }
      : null;

    return {
      bookings,
      pagination,
      isEmpty: bookings.length === 0,
      isFirstPage: pagination?.page === 1,
      isLastPage: pagination ? pagination.page >= pagination.totalPages : true,
    };
  }, [query.data]);

  return {
    ...query,
    ...computedValues,
  };
}

export const bookingUtils = {
  // Status helpers
  isUpcoming: (booking: Booking) => new Date(booking.startTime) > new Date(),
  isPast: (booking: Booking) => new Date(booking.endTime) < new Date(),
  isToday: (booking: Booking) => {
    const today = new Date().toDateString();
    return new Date(booking.startTime).toDateString() === today;
  },

  // Status color mapping
  getStatusColor: (status: BookingStatus) => {
    const colors = {
      [BookingStatus.PENDING]: "yellow",
      [BookingStatus.CONFIRMED]: "green",
      [BookingStatus.COMPLETED]: "blue",
      [BookingStatus.CANCELED]: "red",
      [BookingStatus.RESCHEDULED]: "orange",
    };
    return colors[status] || "gray";
  },

  // Format duration
  formatDuration: (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  },

  // Get event type display name
  getEventTypeDisplay: (eventType: EventType) => {
    return eventType === "introduction_call" ? "Introductory Call" : "Class";
  },

  // Filter helper for common queries
  createDateRangeFilter: (days: number) => {
    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + days);

    return {
      dateFrom: now.toISOString(),
      dateTo: future.toISOString(),
    };
  },
};
