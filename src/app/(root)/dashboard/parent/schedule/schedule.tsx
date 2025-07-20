"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

const upcomingData = [
  {
    id: 1,
    title: "Mathematics Class with David Patterson",
    student: "James Patterson",
    tutor: "David Patterson",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    grade: "Grade 11",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
    reschedulable: true,
  },
  {
    id: 2,
    title: "Mathematics Class with David Patterson",
    student: "James Patterson",
    tutor: "David Patterson",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    grade: "Grade 11",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
    reschedulable: false,
  },
];

const historyData = [
  {
    id: 1,
    title: "Elements of UIUX",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
  },
  {
    id: 2,
    title: "Coding for Dummies",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
    image: "/images/tutor-3.png",
  },
];

export default function ClassTabs() {
  return (
    <Tabs defaultValue="history" className="w-full max-w-6xl mx-auto my-[60px]">
      {/* Tabs Header */}
      <TabsList className="flex justify-start gap-10 mb-4 bg-transparent px-4 sm:px-10">
        <TabsTrigger
          value="upcoming"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] rounded-none px-0"
        >
          Upcoming Classes
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] rounded-none px-0"
        >
          Class History
        </TabsTrigger>
      </TabsList>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl shadow-md w-full bg-[#f8f6f4] mb-3">
        {/* Upcoming Classes Tab */}
        <TabsContent value="upcoming" className="space-y-10">
          {upcomingData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[auto_1fr_auto] gap-6 w-full ${
                index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
              }`}
            >
              {/* Left: Image */}
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
                <Image
                  src={item.image}
                  alt="Class"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Middle: Content */}
              <div className="flex flex-col justify-between gap-3">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-[#2c241b] leading-snug font-aeroTrial">
                  {item.title}
                </h2>

                <div className="flex items-center gap-6 flex-wrap text-[#2c241b] font-medium">
                  <span className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    {item.student}
                  </span>
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    {item.tutor}
                  </span>
                </div>

                <div className="flex items-center gap-6 flex-wrap text-[#2c241b] font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {item.date}
                  </span>
                  <span className="text-[32px] leading-none opacity-20">|</span>
                  <span className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    {item.time}
                  </span>
                </div>

                <div className="text-[#9e9e9e] text-[18px] flex gap-4 font-medium">
                  <span>{item.grade}</span>
                  <span className="opacity-40">.</span>
                  <span>{item.subject}</span>
                </div>
              </div>

              {/* Right: Buttons aligned bottom-right */}
              <div className="flex flex-col items-end justify-end gap-2 self-end">
                {item.reschedulable && (
                  <button className="text-[#e94e4e] text-sm font-medium">
                    Reschedule
                  </button>
                )}
                <Button className="px-8 h-[45px] rounded-full bg-[#FFA500] text-white font-semibold">
                  Join Class
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Class History Tab */}
        <TabsContent value="history" className="space-y-10">
          {historyData.map((item, index) => (
            <div
              key={index}
              className={`flex w-full items-start justify-between gap-6 ${
                index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
              }`}
            >
              {/* Class Image */}
              <div className="relative w-36 h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
                <Image
                  src={item.image}
                  alt="Class"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Class Content */}
              <div className="flex flex-col items-start justify-center gap-[22px] w-full">
                <h2 className="text-[32px] font-medium text-[#2c241b] leading-normal font-aeroTrial flex items-start">
                  {item.title}
                </h2>

                <div className="flex flex-wrap items-start justify-between gap-6 w-full max-w-[656px]">
                  <div className="flex flex-col gap-3 items-start">
                    <CalendarIcon className="w-6 h-6 text-[#2c241b]" />
                    <div className="text-2xl font-medium text-[#2c241b] leading-[26.2px] font-['Montserrat']">
                      {item.date}
                      <br />
                      <span className="text-xl text-[#2c241b99]">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block text-[64px] leading-none opacity-20 text-[#2c241b]">
                    |
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <ClockIcon className="w-6 h-6 text-[#2c241b]" />
                    <div className="text-2xl font-medium text-[#2c241b] leading-[26.2px] font-['Montserrat'] whitespace-nowrap">
                      {item.duration}
                    </div>
                  </div>

                  <div className="hidden sm:block text-[64px] leading-none opacity-20 text-[#2c241b]">
                    |
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <BookOpenIcon className="w-6 h-6 text-[#2c241b]" />
                    <div className="text-2xl font-medium text-[#2c241b] leading-[26.2px] font-['Montserrat'] whitespace-nowrap">
                      {item.subject}
                    </div>
                  </div>
                </div>

                {/* Right-aligned Button */}
                <div className="self-end">
                  <Button className="px-10 py-0 h-auto bg-secondary rounded-full">
                    <span className="text-white text-[16px] font-medium leading-[55px] whitespace-nowrap">
                      View Lesson Notes
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </div>
    </Tabs>
  );
}
