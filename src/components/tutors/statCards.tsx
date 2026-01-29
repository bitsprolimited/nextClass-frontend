import { Download, Wallet, PencilLine, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  {
    id: 1,
    label: "Current Balance",
    value: "N22.8m",
    bg: "bg-green-200",
    icon: <Coins className="w-4 h-4 text-muted-foreground" />,
  },
  {
    id: 2,
    label: "Total Withdrawn",
    value: "N12.6m",
    bg: "bg-red-100",
    icon: <PencilLine className="w-4 h-4 text-muted-foreground" />,
  },
  {
    id: 3,
    label: "Total Earnings",
    value: "N19.2m",
    bg: "bg-blue-100",
    icon: <Wallet className="w-4 h-4 text-muted-foreground" />,
    growth: "+15.03%",
    note: "N192,000 this week",
  },
  {
    id: 4,
    label: "Total Downloads",
    value: "N12.6m",
    bg: "bg-orange-100",
    icon: <Download className="w-4 h-4 text-muted-foreground" />,
  },
];

export default function StatCards() {
  return (
    <div className="w-full space-y-6">
      {/* Scrollable Stat Cards */}
      <div className="overflow-x-auto w-full">
        <div className="flex gap-4 min-w-[850px]">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`flex flex-col justify-between rounded-xl ${metric.bg} min-w-[320px] px-4 py-4`}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                {metric.icon}
                <span>{metric.label}</span>
              </div>

              {/* Value + Growth */}
              <div className="mt-6 flex justify-between">
                <div className="text-2xl font-semibold text-black">
                  {metric.value}
                </div>
                {metric.growth && (
                  <div className="flex flex-col items-end mt-1 text-xs">
                    <span className="text-green-600 font-medium">
                      {metric.growth} <span className="inline-block">📈</span>
                    </span>
                    <span className="text-gray-600">{metric.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Button - visible after scrolling */}
      <div className="flex justify-end">
        <Button className="bg-[#031D95] text-white px-10 py-5 h-auto rounded-full flex items-center gap-2">
          <PencilLine className="w-4 h-4" />
          Withdraw to Bank
        </Button>
      </div>
    </div>
  );
}
