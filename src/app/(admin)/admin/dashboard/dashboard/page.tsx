import StatCard from "@/components/admin/StatCard";
import DailyOperations from "@/components/tutors/statistics/DailyOperations";
import RecentActivityFeed from "@/components/tutors/statistics/RecentActivityField";
import RequestsDonutChart from "@/components/tutors/statistics/RequestDonutChart";
import RevenueLineChart from "@/components/tutors/statistics/RevenueLineChart";
import { Users, GraduationCap, UserCheck } from "lucide-react";

export default function DashboardPage() {
  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Registered Parents"
          value="1,543"
          icon={<Users />}
          change="18%"
        />
        <StatCard
          title="Total Registered Learners"
          value="1,543"
          icon={<GraduationCap />}
          change="18%"
        />
        <StatCard
          title="Total Registered Tutors"
          value={196}
          icon={<UserCheck />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Verified", value: 100, color: "text-green-600" },
            { label: "Pending", value: "9%", color: "text-red-500" },
          ]}
        />
        {/* <StatCard title="Total Revenue" value="₦124,309.50" /> */}
        <StatCard
          title="Total Registered Tutors"
          value={196}
          icon={<UserCheck />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Verified", value: 100, color: "text-green-600" },
            { label: "Pending", value: "9%", color: "text-red-500" },
          ]}
        />
        {/* <StatCard
          title="Total Registered Tutors"
          value={196}
          icon={<UserCheck />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Verified", value: 100, color: "text-green-600" },
            { label: "Pending", value: "9%", color: "text-red-500" },
          ]}
        /> */}
      </div>
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
    </main>
  );
}
