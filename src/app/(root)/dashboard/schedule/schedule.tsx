"use client";

import BookingTabContent from "@/components/schedule/BookingTabsContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookingUtils, useBookings } from "@/hooks/useBooking";
import {
  BookingStatus,
  EventType,
  SortBy,
  SortOrder,
} from "@/services/booking.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ClassTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeMainTab, setActiveMainTab] = useState(
    tabParam === "introductory_calls" ? "introductory_calls" : "classes"
  );
  const [activeSubTab, setActiveSubTab] = useState("upcoming");

  useEffect(() => {
    if (tabParam === "introductory_calls" || tabParam === "classes") {
      setActiveMainTab(tabParam);
    }
  }, [tabParam]);

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
      limit: 100,
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
      eventType: EventType.CLASS,
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

  const upcomingClassBookings = useMemo(
    () =>
      upcomingClassesQuery.bookings
        .filter((booking) => !bookingUtils.isPast(booking))
        .slice(0, 20),
    [upcomingClassesQuery.bookings]
  );

  const historyClassBookings = useMemo(
    () =>
      historyClassesQuery.bookings.filter(
        (booking) =>
          bookingUtils.isPast(booking) ||
          [BookingStatus.COMPLETED, BookingStatus.CANCELED].includes(
            booking.status
          )
      ),
    [historyClassesQuery.bookings]
  );

  const upcomingCallBookings = useMemo(
    () =>
      upcomingCallsQuery.bookings
        .filter((booking) => !bookingUtils.isPast(booking))
        .slice(0, 20),
    [upcomingCallsQuery.bookings]
  );

  const historyCallBookings = useMemo(
    () =>
      historyCallsQuery.bookings.filter(
        (booking) =>
          bookingUtils.isPast(booking) ||
          [BookingStatus.COMPLETED, BookingStatus.CANCELED].includes(
            booking.status
          )
      ),
    [historyCallsQuery.bookings]
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
            <div className="w-full mb-3">
              <TabsContent value="upcoming">
                <BookingTabContent
                  bookings={upcomingClassBookings}
                  isLoading={upcomingClassesQuery.isLoading}
                  error={upcomingClassesQuery.error}
                  isHistory={false}
                  type="classes"
                  refetch={upcomingClassesQuery.refetch}
                />
              </TabsContent>

              <TabsContent value="history">
                <BookingTabContent
                  bookings={historyClassBookings}
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
            <div className="w-full mb-3">
              <TabsContent value="upcoming">
                <BookingTabContent
                  bookings={upcomingCallBookings}
                  isLoading={upcomingCallsQuery.isLoading}
                  error={upcomingCallsQuery.error}
                  isHistory={false}
                  type="calls"
                  refetch={upcomingCallsQuery.refetch}
                />
              </TabsContent>

              <TabsContent value="history">
                <BookingTabContent
                  bookings={historyCallBookings}
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
