"use client";

import { BookingItem } from "@/components/schedule/BookinItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "@/hooks/useBooking";
import { useAuth } from "@/providers/AuthProvider";
import {
  Booking,
  BookingStatus,
  EventType,
  SortBy,
  SortOrder
} from "@/services/booking.service";
import {
  AlertCircle,
  BookOpenIcon,
  RefreshCw,
} from "lucide-react";
import { useMemo, useState } from "react";

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
function BookingTabContent({
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
          <BookingItem session={session} booking={booking} isHistory={isHistory} />
        </div>
      ))}
    </div>
  );
}

export default function ClassTabs() {
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
      className="gap-4 pt-4 md:pt-0"
    >
      <TabsList className="bg-[#eff0ff] md:bg-[#f3f3f3] justify-start md:rounded-none md:border-b md:px-4 py-0 md:w-full flex w-fit mx-auto">
        <div className="flex w-full max-w-6xl mx-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className=" md:bg-[#f3f3f3] data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full md:rounded-none md:border-0 md:border-b-2 md:border-transparent md:data-[state=active]:shadow-none text-black"
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
          className="w-full max-w-6xl mx-auto my-[30px] md:my-[60px]"
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
