"use client";

import BookingsTabs from "@/components/tutors/BookingTabs";
import ReviewsPanel from "@/components/tutors/ReviewsPanel";

import StatCards from "@/components/tutors/statCards";
import SearchAndFilter from "@/components/tutors/TransactionSearchFilter";

import { JSX } from "react";

export const Earnings = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 w-full max-w-6xl mx-auto">
      <StatCards />
      <SearchAndFilter />
      <BookingsTabs />
    </div>
  );
};
