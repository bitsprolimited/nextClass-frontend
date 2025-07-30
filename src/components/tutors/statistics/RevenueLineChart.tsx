"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const data = [
  { month: "Jun", value: 40000 },
  { month: "Jul", value: 48000 },
  { month: "Aug", value: 35000 },
  { month: "Sept", value: 78000 },
  { month: "Oct", value: 72000 },
  { month: "Nov", value: 98000 },
  { month: "Dec", value: 95000 },
];

export default function RevenueLineChart() {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800">
          Revenue Overview
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            This Week <ChevronDown className="w-4 h-4" />
          </span>

          <span className="flex items-center gap-1 font-bold">
            <ChevronLeft className="w-4 h-4" />
            2025
            <ChevronRight className="w-4 h-4" />
          </span>

          <MoreVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-4 w-full" />

      {/* Chart */}
      <div className="rounded-xl bg-[#F8F2F2] p-2">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="0" // solid lines
              stroke="#e5e7eb" // Tailwind gray-200
              vertical={false} // only horizontal lines
              strokeWidth={2} // thicker lines
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }} // text-gray-500
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{ r: 5, fill: "#f97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
