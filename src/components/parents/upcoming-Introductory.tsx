"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "@/hooks/useBooking";
import {
  BookingStatus,
  EventType,
  SortBy,
  SortOrder,
} from "@/services/booking.service";
import { useMemo, useState } from "react";
import BookingTabContent from "../schedule/BookingTabsContent";
import Link from "next/link";
import { Button } from "../ui/button";

export default function UpcomingCallTabs() {
  const [activeTab, setActiveTab] = useState("classes");

  const upcomingParams = useMemo(() => {
    return {
      statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      sortBy: "startTime" as SortBy,
      sortOrder: "asc" as SortOrder,
      limit: 3,
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
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-6xl mx-auto bg-[#f8f6f4] lg:rounded-b-2xl shadow-md"
    >
      {/* Tabs Header */}
      <TabsList className="flex justify-start mb-4 bg-transparent px-4 sm:px-0">
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
      <TabsContent
        value="classes"
        className="w-full bg-[#f8f6f4] space-y-10 p-4"
      >
        <BookingTabContent
          bookings={upcomingClassesQuery.bookings}
          isLoading={upcomingClassesQuery.isLoading}
          error={upcomingClassesQuery.error}
          isHistory={false}
          type="classes"
          refetch={upcomingClassesQuery.refetch}
        />
      </TabsContent>

      {/* Upcoming Classes Tab */}
      <TabsContent
        value="introductory_calls"
        className="w-full bg-[#f8f6f4] space-y-10 p-4"
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

      <div className="flex justify-center">
        <Link
          href={`/dashboard/schedule?tab=${activeTab}`}
          className="w-full max-w-lg"
        >
          <Button className="w-full px-4 py-3 h-auto border border-[#031D95] text-[#031D95] bg-transparent rounded-full text-sm font-medium hover:bg-[#031D95] hover:text-white transition my-4">
            View more
          </Button>
        </Link>
      </div>
    </Tabs>
  );
}
