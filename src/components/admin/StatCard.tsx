import { Card, CardContent } from "@/components/ui/card";

interface SubStat {
  label: string;
  value: string | number;
  color?: string; // e.g., "text-green-600"
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeColor?: string; // e.g., "bg-green-100 text-green-600"
  subStats?: SubStat[];
  iconBg?: string; // e.g., "bg-yellow-50"
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  changeColor = "bg-red-100 text-red-500",
  subStats,
  iconBg = "bg-yellow-50",
  className = "",
}: StatCardProps) {
  return (
    <Card
      className={`rounded-2xl shadow-sm border border-[#ECECEC] min-w-[220px] ${className}`}
    >
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex flex-col">
          {/* First row: Icon + Title */}
          <div className="flex items-center gap-2">
            {icon && (
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full ${iconBg}`}
              >
                {icon}
              </span>
            )}
            <span className="text-sm text-[#2c241b] font-medium">{title}</span>
          </div>

          {/* Second row: Change badge aligned right */}
          {change && (
            <div className="flex justify-end mt-1">
              <div
                className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-semibold ${changeColor}`}
              >
                {change}
              </div>
            </div>
          )}
        </div>

        {/* Value + Substats */}
        <div className="flex gap-4">
          {/* Main Value */}
          <div className="text-2xl font-bold text-[#2c241b]">{value}</div>

          {/* Substats */}
          {subStats && (
            <div className="flex gap-4 divide-x divide-gray-300">
              {subStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center min-w-[40px] px-2 ${
                    index === 0 ? "" : "" // ensures padding around dividers
                  }`}
                >
                  <span className="text-[11px] text-gray-400">
                    {stat.label}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      stat.color ?? "text-green-600"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
