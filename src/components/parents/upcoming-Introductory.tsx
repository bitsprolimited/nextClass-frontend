"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon, UsersIcon } from "lucide-react";

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
    reschedulable: true,
  },
];

export default function UpcomingIntroductionTabs() {
  return (
    <Tabs defaultValue="request" className="w-full max-w-6xl mx-auto ">
      {/* Tabs Header */}
      <TabsList className="flex justify-start gap-10 mb-4 bg-transparent px-4 sm:px-10">
        <TabsTrigger
          value="request"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none px-0"
        >
          UPCOMING CLASSES
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="text-sm text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#031D95] data-[state=active]:bg-[#031D95]/5 rounded-none px-0"
        >
          INTRODUCTORY CALL
        </TabsTrigger>
      </TabsList>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl shadow-md w-full bg-[#f8f6f4] mb-3">
        {/* Upcoming Classes Tab */}
        <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl  w-full mb-3">
          {/* Upcoming Classes Tab */}
          <TabsContent value="request" className="space-y-10">
            {upcomingData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 w-full ${
                  index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
                }`}
              >
                {/* Left: Image */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
                  <Image
                    src={item.image}
                    alt="Class"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Middle: Content */}
                <div className="flex flex-col justify-between gap-2 sm:gap-3">
                  <h2 className="text-base sm:text-lg md:text-3xl text-[#2c241b] leading-snug font-aero-trial">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
                    <span className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.student}
                    </span>
                    <span className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.tutor}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.date}
                    </span>
                    <span className="hidden sm:inline text-[24px] sm:text-[32px] leading-none opacity-20">
                      |
                    </span>
                    <span className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.time}
                    </span>
                  </div>

                  <div className="text-[#9e9e9e] text-xs sm:text-sm md:text-lg flex gap-2 sm:gap-4 font-medium">
                    <span>{item.grade}</span>
                    <span className="opacity-40">.</span>
                    <span>{item.subject}</span>
                  </div>

                  {/* Buttons → move below on mobile, stay right on desktop */}
                  <div className="flex justify-end gap-3 sm:gap-6 mt-3 sm:mt-0 sm:self-end">
                    {item.reschedulable && (
                      <button className="text-[#e94e4e] text-xs sm:text-sm font-medium px-4 sm:px-8 h-[36px] sm:h-[45px]">
                        Cancel
                      </button>
                    )}
                    <Button className="px-5 sm:px-8 h-[36px] sm:h-[45px] rounded-full bg-primary text-white font-semibold text-xs sm:text-sm">
                      Reschedule Class
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </div>

        {/* Class History Tab */}
        <div className="px-4 py-6 sm:px-6 sm:py-8 rounded-2xl  w-full mb-3">
          {/* Upcoming Classes Tab */}
          <TabsContent value="history" className="space-y-10">
            {upcomingData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 w-full ${
                  index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
                }`}
              >
                {/* Left: Image */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
                  <Image
                    src={item.image}
                    alt="Class"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Middle: Content */}
                <div className="flex flex-col justify-between gap-2 sm:gap-3">
                  <h2 className="text-base sm:text-lg md:text-3xl text-[#2c241b] leading-snug font-aero-trial">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
                    <span className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.student}
                    </span>
                    <span className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.tutor}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.date}
                    </span>
                    <span className="hidden sm:inline text-[24px] sm:text-[32px] leading-none opacity-20">
                      |
                    </span>
                    <span className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {item.time}
                    </span>
                  </div>

                  <div className="text-[#9e9e9e] text-xs sm:text-sm md:text-lg flex gap-2 sm:gap-4 font-medium">
                    <span>{item.grade}</span>
                    <span className="opacity-40">.</span>
                    <span>{item.subject}</span>
                  </div>

                  <div className="flex justify-end gap-3 sm:gap-6 mt-3 sm:mt-0 sm:self-end">
                    <Button className="px-5 sm:px-8 h-[36px] sm:h-[45px] rounded-full bg-primary text-white font-semibold text-xs sm:text-sm">
                      View Lesson Notes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
