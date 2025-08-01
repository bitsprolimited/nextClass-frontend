"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CalendarDays, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

const data = [
  { name: "Jan", Cancelled: 800, Attended: 100, "Call Requests": 50 },
  { name: "Feb", Cancelled: 400, Attended: 200, "Call Requests": 600 },
  { name: "Mar", Cancelled: 100, Attended: 90, "Call Requests": 100 },
  { name: "Apr", Cancelled: 650, Attended: 200, "Call Requests": 950 },
  { name: "May", Cancelled: 100, Attended: 800, "Call Requests": 300 },
  { name: "June", Cancelled: 700, Attended: 240, "Call Requests": 400 },
  { name: "July", Cancelled: 500, Attended: 600, "Call Requests": 650 },
  { name: "Aug", Cancelled: 300, Attended: 550, "Call Requests": 80 },
  { name: "Sept", Cancelled: 680, Attended: 150, "Call Requests": 250 },
  { name: "Oct", Cancelled: 400, Attended: 70, "Call Requests": 200 },
];

const drivers = [
  {
    name: "Ayo Okoye",
    grade: "Grade 1",
    earned: "+₦0",
    avatar: "/images/Author.png",
  },
  {
    name: "Owolabi Ali",
    grade: "Grade 1",
    earned: "+₦50",
    avatar: "/images/Drivers.png",
  },
  {
    name: "Ayo Okoye",
    grade: "Grade 1",
    earned: "+₦0",
    avatar: "/images/Drivers.png",
  },
  {
    name: "Owolabi Ali",
    grade: "Grade 1",
    earned: "+₦50",
    avatar: "/images/Drivers.png",
  },
  {
    name: "Ayo Okoye",
    grade: "Grade 1",
    earned: "+₦0",
    avatar: "/images/Drivers.png",
  },
];

export default function DailyOperations() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Daily Operations */}
      <Card className="lg:col-span-2 p-4 h-[380px] flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-black">Daily Operations</h2>
          <div className="flex items-center gap-2 text-sm">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center px-3 py-1.5 text-sm border rounded-full border-gray-200 shadow-sm gap-2 hover:bg-gray-50">
                  <CalendarDays size={16} className="text-primary" />
                  {selectedDate
                    ? format(selectedDate, "dd/MM/yyyy")
                    : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 mt-2" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <MoreVertical className="text-gray-400 cursor-pointer" size={18} />
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Chart & Legend */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Legend - aligned top right */}
          <div className="flex justify-end gap-6 text-sm px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#3A52EE] " />
              <span>Cancelled</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#8A9EFF] " />
              <span>Attended</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FFB300] " />
              <span>Call Requests</span>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barCategoryGap="20%">
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="Cancelled"
                  fill="#3A52EE"
                  barSize={4}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Attended"
                  fill="#8A9EFF"
                  barSize={4}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Call Requests"
                  fill="#FFB300"
                  barSize={4}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Students - remains unchanged */}
      <Card className="p-4 h-[380px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-[20px] font-semibold font-Montserrat text-[#101010]">
              Students
            </h2>
            <MoreVertical size={18} className="text-gray-400 cursor-pointer" />
          </div>
          <Separator className="mb-4" />

          <div className="flex justify-around items-center text-sm mb-4">
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Scheduled</p>
              <p className="text-2xl font-bold text-black">05</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Total</p>
              <p className="text-2xl font-bold text-black">05</p>
            </div>
          </div>

          <Separator className="mb-4" />
        </div>

        <CardContent className="p-0 space-y-3 overflow-auto">
          {drivers.map((student, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={student.avatar}
                  alt={student.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-primary hover:underline cursor-pointer">
                    {student.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student.grade}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  student.earned === "+₦0"
                    ? "text-muted-foreground"
                    : "text-green-600"
                }`}
              >
                {student.earned}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
