"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookingUtils, useBookings } from "@/hooks/useBooking";
import {
  acceptBooking,
  Booking,
  BookingStatus,
  EventType,
  SortBy,
  SortOrder,
} from "@/services/booking.service";
import { Session } from "@/services/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isAfter, parseISO } from "date-fns";
import {
  AlertCircle,
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  Loader2,
  RefreshCw,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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

// Booking item component
export function BookingItem({
  booking,
  isHistory = false,
  session,
}: {
  booking: Booking;
  isHistory?: boolean;
  session: Session | null | undefined;
}) {
  const startTime = parseISO(booking.startTime);
  const endTime = parseISO(booking.endTime);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Format date and time
  const formattedDate = format(startTime, "E, MMM d");
  const formattedTime = `${format(startTime, "h:mmaaa")} - ${format(
    endTime,
    "h:mmaaa"
  )}`;
  const duration = bookingUtils.formatDuration(booking.duration);

  // Get status color
  const statusColor = bookingUtils.getStatusColor(booking.status);

  // Check if booking is reschedulable (upcoming and not completed/canceled)
  const canReschedule =
    !isHistory &&
    isAfter(startTime, new Date()) &&
    ![BookingStatus.COMPLETED, BookingStatus.CANCELED].includes(booking.status);

  // Get default tutor image or use provided one
  const tutorImage = booking.teacher?.profilePicture || "/images/tutor-1.png";
  const parentImage = booking.parent?.profilePicture || "/images/tutor-1.png";

  const isTutor = session?.user && session?.user.role === "teacher";

  const { mutate: acceptBookingMutation, isPending } = useMutation({
    mutationKey: ["accept-booking", booking._id],
    mutationFn: acceptBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking accepted successfully");
    }
  });

  const handleAcceptBooking = () => {
    acceptBookingMutation(booking._id);
  };

  // Create title
  const title = booking.subject
    ? `${booking.subject} ${bookingUtils.getEventTypeDisplay(
        booking.eventType
      )} with ${booking.teacher?.fullName || "Teacher"}`
    : `${bookingUtils.getEventTypeDisplay(booking.eventType)} with ${
        booking.teacher?.fullName || "Teacher"
      }`;

  const handleJoinSession = () => {
    router.push(`/dashboard/meeting/${booking.meetingLink}`);
  };

  return (
    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 w-full">
      {/* Left: Image */}
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
        <Image
          src={isTutor ? parentImage : tutorImage}
          alt="Tutor"
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to default image on error
            e.currentTarget.src = "/images/tutor-default.png";
          }}
        />
        {/* Status indicator */}
        {!isHistory && (
          <div
            className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-${statusColor}-500`}
          />
        )}
      </div>

      {/* Middle: Content */}
      <div className="flex flex-col justify-between gap-2 sm:gap-3">
        <h2 className="text-base sm:text-lg md:text-3xl text-[#2c241b] leading-snug font-aero-trial">
          {title}
        </h2>

        <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
          {booking.learners && booking.learners.length > 0 && (
            <span className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {booking.learners.map((l) => l.name).join(", ")}
            </span>
          )}
          <span className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {booking.teacher?.fullName || "Teacher"}
          </span>
        </div>

        {isHistory ? (
          // History view - different layout
          <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6 w-full max-w-[656px] text-xs sm:text-sm md:text-base">
            {/* Date */}
            <div className="flex flex-col gap-2 items-start">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat">
                {formattedDate}
                <br />
                <span className="text-[#2c241b99] text-[11px] sm:text-sm md:text-lg">
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block text-[24px] sm:text-[40px] md:text-[64px] leading-none opacity-20 text-[#2c241b]">
              |
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2 items-start">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat whitespace-nowrap text-xs sm:text-sm md:text-lg">
                {duration}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block text-[24px] sm:text-[40px] md:text-[64px] leading-none opacity-20 text-[#2c241b]">
              |
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2 items-start">
              <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat whitespace-nowrap text-xs sm:text-sm md:text-lg">
                {booking.subject || "General Session"}
              </div>
            </div>
          </div>
        ) : (
          // Upcoming view - original layout
          <>
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {formattedDate}
              </span>
              <span className="hidden sm:inline text-[24px] sm:text-[32px] leading-none opacity-20">
                |
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {formattedTime}
              </span>
            </div>

            <div className="text-[#9e9e9e] text-xs sm:text-sm md:text-lg flex gap-2 sm:gap-4 font-medium">
              <span>Duration: {duration}</span>
              {booking.subject && (
                <>
                  <span className="opacity-40">.</span>
                  <span>{booking.subject}</span>
                </>
              )}
            </div>
          </>
        )}

        {/* Action buttons */}
        <div
          className={`flex ${
            isHistory ? "justify-end" : "justify-end"
          } gap-3 sm:gap-6 mt-3 sm:mt-0 sm:self-end`}
        >
          {isHistory ? (
            booking.eventType === EventType.CLASS ? (
              <Button className="px-5 sm:px-8 md:px-10 py-0 h-[36px] sm:h-[45px] bg-secondary rounded-full">
                <span className="text-white text-xs sm:text-sm md:text-base font-medium leading-[36px] sm:leading-[45px] whitespace-nowrap">
                  View Lesson Notes
                </span>
              </Button>
            ) : (
              <Badge className="bg-[#007B0C33] text-[#007B0C] rounded-full px-5 py-3 font-montserrat">
                Completed
              </Badge>
            )
          ) : (
            <>
              {canReschedule && (
                <button className="text-[#e94e4e] text-xs sm:text-sm font-medium px-4 sm:px-8 h-[36px] sm:h-[45px]">
                  Reschedule
                </button>
              )}
              {booking.status === BookingStatus.PENDING ? (
                <Button
                  className="px-5 sm:px-8 h-[36px] sm:h-[45px] rounded-full bg-secondary text-white font-semibold text-xs sm:text-sm"
                  onClick={handleAcceptBooking}
                >
                  {isPending ? <Loader2 className="animate-spin" /> : "Accept"}
                </Button>
              ) : (
                <Button
                  className="px-5 sm:px-8 h-[36px] sm:h-[45px] rounded-full bg-secondary text-white font-semibold text-xs sm:text-sm"
                  disabled={booking.status === BookingStatus.CANCELED}
                  onClick={handleJoinSession}
                >
                  {booking.status === BookingStatus.CANCELED
                    ? "Canceled"
                    : "Join Session"}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Tab content component for bookings
function BookingTabContent({
  bookings,
  isLoading,
  error,
  isHistory = false,
  type,
  refetch,
  session,
}: {
  bookings: Booking[];
  isLoading: boolean;
  error: Error | null;
  isHistory?: boolean;
  type: "classes" | "calls";
  session?: Session | null;
  refetch: () => void;
}) {
  if (isLoading) {
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

  if (error) {
    return (
      <ErrorMessage
        message={error.message || "Failed to load bookings"}
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

export default function ClassTabs({ session }: { session: Session | null }) {
  const [activeMainTab, setActiveMainTab] = useState("classes");
  const [activeSubTab, setActiveSubTab] = useState("upcoming");

  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value);
    setActiveSubTab("upcoming");
  };

  const shouldFetchUpcomingClasses =
    activeMainTab === "classes" && activeSubTab === "upcoming";
  const shouldFetchHistoryClasses =
    activeMainTab === "classes" && activeSubTab === "history";
  const shouldFetchUpcomingCalls =
    activeMainTab === "introductory_calls" && activeSubTab === "upcoming";
  const shouldFetchHistoryCalls =
    activeMainTab === "introductory_calls" && activeSubTab === "history";

  const upcomingParams = useMemo(() => {
    return {
      statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      sortBy: "startTime" as SortBy,
      sortOrder: "asc" as SortOrder,
      limit: 20,
      dateFrom: new Date().toISOString(),
    };
  }, []);

  const historyParams = useMemo(() => {
    return {
      statuses: [BookingStatus.COMPLETED, BookingStatus.CANCELED],
      sortBy: "startTime" as SortBy,
      sortOrder: "desc" as SortOrder,
      limit: 20,
      dateTo: new Date().toISOString(),
    };
  }, []);

  // Fetch bookings based on active tab and status
  const upcomingClassesQuery = useBookings(
    {
      ...upcomingParams,
      eventType: EventType.CLASS, // Only future bookings
    },
    { enabled: shouldFetchUpcomingClasses }
  );

  const historyClassesQuery = useBookings(
    {
      ...historyParams,
      eventType: EventType.CLASS,
    },
    { enabled: shouldFetchHistoryClasses }
  );

  const upcomingCallsQuery = useBookings(
    {
      ...upcomingParams,
      eventType: EventType.INTRODUCTION_CALL,
    },
    { enabled: shouldFetchUpcomingCalls }
  );

  const historyCallsQuery = useBookings(
    {
      ...historyParams,
      eventType: EventType.INTRODUCTION_CALL,
    },
    { enabled: shouldFetchHistoryCalls }
  );

  const tabs = [
    {
      name: "Classes",
      value: "classes",
    },
    {
      name: "Introductory Calls",
      value: "introductory_calls",
    },
  ];

  return (
    <Tabs
      value={activeMainTab}
      onValueChange={handleMainTabChange}
      className="gap-4"
    >
      <TabsList className="bg-[#f3f3f3] justify-start rounded-none border-b px-4 py-0 w-full">
        <div className="flex w-full max-w-6xl mx-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-[#f3f3f3] data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      <TabsContent value="classes">
        <Tabs
          defaultValue="upcoming"
          value={activeSubTab}
          onValueChange={setActiveSubTab}
          className="w-full max-w-6xl mx-auto my-[60px]"
        >
          <TabsList className="flex justify-start mb-4 bg-transparent px-4 sm:px-0">
            <TabsTrigger
              value="upcoming"
              className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
            >
              History
            </TabsTrigger>
          </TabsList>

          <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl shadow-md w-full bg-[#f8f6f4] mb-3">
            <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl w-full mb-3">
              <TabsContent value="upcoming">
                <BookingTabContent
                  bookings={upcomingClassesQuery.bookings}
                  isLoading={upcomingClassesQuery.isLoading}
                  error={upcomingClassesQuery.error}
                  isHistory={false}
                  type="classes"
                  refetch={upcomingClassesQuery.refetch}
                  session={session}
                />
              </TabsContent>

              <TabsContent value="history">
                <BookingTabContent
                  bookings={historyClassesQuery.bookings}
                  isLoading={historyClassesQuery.isLoading}
                  error={historyClassesQuery.error}
                  isHistory={true}
                  type="classes"
                  refetch={historyClassesQuery.refetch}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </TabsContent>

      <TabsContent value="introductory_calls">
        <Tabs
          defaultValue="upcoming"
          value={activeSubTab}
          onValueChange={setActiveSubTab}
          className="w-full max-w-6xl mx-auto my-[60px]"
        >
          <TabsList className="flex justify-start mb-4 bg-transparent  px-4 sm:px-0">
            <TabsTrigger
              value="upcoming"
              className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
            >
              History
            </TabsTrigger>
          </TabsList>

          <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl shadow-md w-full bg-[#f8f6f4] mb-3">
            <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl w-full mb-3">
              <TabsContent value="upcoming">
                <BookingTabContent
                  bookings={upcomingCallsQuery.bookings}
                  isLoading={upcomingCallsQuery.isLoading}
                  error={upcomingCallsQuery.error}
                  isHistory={false}
                  type="calls"
                  session={session}
                  refetch={upcomingCallsQuery.refetch}
                />
              </TabsContent>

              <TabsContent value="history">
                <BookingTabContent
                  bookings={historyCallsQuery.bookings}
                  isLoading={historyCallsQuery.isLoading}
                  error={historyCallsQuery.error}
                  isHistory={true}
                  type="calls"
                  refetch={historyCallsQuery.refetch}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
}
