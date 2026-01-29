import { Booking } from "@/services/booking.service";
import { BookingItem } from "./BookinItem";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle, BookOpenIcon, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function BookingItemSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 w-full">
      <Skeleton className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-[10px]" />
      <div className="flex flex-col justify-between gap-2 sm:gap-3 flex-1">
        <Skeleton className="h-6 sm:h-8 w-3/4" />
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-40" />
        <div className="flex justify-end gap-3 mt-3">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

// Error component
function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Try again
      </Button>
    </div>
  );
}

// Empty state component
function EmptyState({
  type,
  status,
}: {
  type: "classes" | "calls";
  status: "upcoming" | "history";
}) {
  const messages = {
    classes: {
      upcoming: "No upcoming classes scheduled",
      history: "No class history available",
    },
    calls: {
      upcoming: "No upcoming introductory calls scheduled",
      history: "No introductory call history available",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BookOpenIcon className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {messages[type][status]}
      </h3>
      <p className="text-gray-600">
        {status === "upcoming"
          ? "Check back later or book a new session."
          : "Your past sessions will appear here."}
      </p>
    </div>
  );
}

// Tab content component for bookings
export default function BookingTabContent({
  bookings,
  isLoading,
  error,
  isHistory = false,
  type,
  refetch,
}: {
  bookings: Booking[];
  isLoading: boolean;
  error: Error | null;
  isHistory?: boolean;
  type: "classes" | "calls";
  refetch: () => void;
}) {
  const { session, isLoading: isAuthLoading, error: authError } = useAuth();
  if (isLoading || isAuthLoading) {
    return (
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={index > 0 ? "pt-10 border-t border-[#031d9547]" : ""}
          >
            <BookingItemSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error || authError) {
    const message = error?.message || authError?.message;
    return (
      <ErrorMessage
        message={message || "Failed to load bookings"}
        onRetry={refetch}
      />
    );
  }

  if (bookings.length === 0) {
    return (
      <EmptyState type={type} status={isHistory ? "history" : "upcoming"} />
    );
  }

  return (
    <div className="space-y-10">
      {bookings.map((booking, index) => (
        <div
          key={booking._id}
          className={`${index > 0 ? "pt-10 border-t border-[#031d9547]" : ""}`}
        >
          <BookingItem
            session={session}
            booking={booking}
            isHistory={isHistory}
          />
        </div>
      ))}
    </div>
  );
}
