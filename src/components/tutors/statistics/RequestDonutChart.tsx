"use client";

import { MoreVertical } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Class", value: 870 },
  { name: "Call", value: 262 },
];

const COLORS = ["#007bff", "#8e44ad"];

export default function RequestsDonutChart() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800">
          All Request
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-4 w-full" />

      <div className="relative w-full h-52 flex items-center justify-center">
        {/* Center Label Overlay */}
        <div className="absolute z-10 text-center">
          <p className="text-2xl font-bold">1132</p>
          <p className="text-sm text-gray-600">Requests</p>
        </div>

        {/* Donut Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={80} // Slimmer ring
              outerRadius={95}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#007bff] " /> Class
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#8e44ad] " /> Call
        </div>
      </div>
    </div>
  );
}
