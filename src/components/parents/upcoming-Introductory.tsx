"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "@/hooks/useBooking";
import {
  BookingStatus,
  EventType,
  SortBy,
  SortOrder,
} from "@/services/booking.service";
import { useMemo } from "react";
import BookingTabContent from "../schedule/BookingTabsContent";

export default function UpcomingCallTabs() {
  const upcomingParams = useMemo(() => {
    return {
      statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      sortBy: "startTime" as SortBy,
      sortOrder: "asc" as SortOrder,
      limit: 20,
      dateFrom: new Date().toISOString(),
    };
  }, []);
  const upcomingClassesQuery = useBookings({
    ...upcomingParams,
    eventType: EventType.CLASS,
  });

  const upcomingCallsQuery = useBookings({
    ...upcomingParams,
    eventType: EventType.INTRODUCTION_CALL,
  });

  return (
    <Tabs
      defaultValue="classes"
      className="w-full max-w-6xl mx-auto bg-[#f8f6f4] lg:rounded-b-2xl shadow-md"
    >
      {/* Tabs Header */}
      <TabsList className="flex justify-start mb-4 bg-transparent  px-4 sm:px-0 bg">
        <TabsTrigger
          value="classes"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
        >
          Upcoming Classes
        </TabsTrigger>
        <TabsTrigger
          value="introductory_calls"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none"
        >
          Introductory Calls
        </TabsTrigger>
      </TabsList>

      {/* Main Content */}
      <TabsContent value="classes" className="w-full bg-[#f8f6f4] space-y-10">
        <BookingTabContent
          bookings={upcomingClassesQuery.bookings}
          isLoading={upcomingClassesQuery.isLoading}
          error={upcomingClassesQuery.error}
          isHistory={false}
          type="classes"
          refetch={upcomingClassesQuery.refetch}
        />
      </TabsContent>

      {/* Class History Tab */}
      {/* Upcoming Classes Tab */}
      <TabsContent
        value="introductory_calls"
        className="w-full bg-[#f8f6f4] space-y-10"
      >
        <BookingTabContent
          bookings={upcomingCallsQuery.bookings}
          isLoading={upcomingCallsQuery.isLoading}
          error={upcomingCallsQuery.error}
          isHistory={false}
          type="calls"
          refetch={upcomingCallsQuery.refetch}
        />
      </TabsContent>
    </Tabs>
  );
}
