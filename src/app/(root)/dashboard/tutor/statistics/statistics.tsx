"use client";

import DailyOperations from "@/components/tutors/statistics/DailyOperations";
import RecentActivityFeed from "@/components/tutors/statistics/RecentActivityField";
import RequestsDonutChart from "@/components/tutors/statistics/RequestDonutChart";
import RevenueLineChart from "@/components/tutors/statistics/RevenueLineChart";
import StatisticsCards from "@/components/tutors/statisticsCard";
import { JSX } from "react";

export const Statistics = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-10 w-full max-w-6xl mx-auto">
      {/* Stat Cards */}
      <StatisticsCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full mt-10 ">
        {/* Donut Chart */}
        <div className="lg:col-span-1 h-full">
          <RequestsDonutChart />
        </div>

        {/* Revenue Chart */}
        <div className="lg:col-span-2 h-full">
          <RevenueLineChart />
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1 h-full">
          <RecentActivityFeed />
        </div>
      </div>

      <DailyOperations />
    </div>
  );
};
