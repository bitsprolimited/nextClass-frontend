"use client";

import { BookOpen, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type Metric = {
  id: number;
  label: string;
  value: string;
  bg: string;
  icon: React.ReactNode;
  growth?: string;
  note?: string;
};

const metrics: Metric[] = [
  {
    id: 1,
    label: "Sessions Taught",
    value: "23",
    bg: "bg-green-100",
    icon: <BookOpen className="w-4 h-4 text-black" />,
  },
  {
    id: 2,
    label: "Active Students",
    value: "30",
    bg: "bg-red-100",
    icon: <Users className="w-4 h-4 text-black" />,
  },
  {
    id: 3,
    label: "Total Earnings",
    value: "₦19.2m",
    bg: "bg-blue-100",
    icon: <Wallet className="w-4 h-4 text-black" />,
    growth: "+15.03%",
    note: "₦192,000 this month",
  },
];

export default function StatisticsCards() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={cn(
            "rounded-xl p-5 h-full flex flex-col justify-between",
            metric.bg
          )}
        >
          {/* Top label */}
          <div className="flex items-center gap-2 text-[20px] text-black opacity[100%]">
            {metric.icon}
            <span className="font-medium">{metric.label}</span>
          </div>
          <div className="flex justify-between mt-5">
            {/* Main value */}
            <div className="mt-6 text-3xl font-bold text-black">
              {metric.value}
            </div>

            {/* Growth and Note (only for earnings) */}
            {metric.growth && (
              <div className="mt-6 text-sm text-right space-y-1">
                <p className="text-green-600 font-medium flex items-center justify-end gap-1">
                  {metric.growth}
                  <span>📈</span>
                </p>
                <p className="text-gray-700">{metric.note}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
