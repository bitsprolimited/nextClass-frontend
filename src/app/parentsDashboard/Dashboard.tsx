"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, Calendar, CalendarIcon, ClockIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import TutorList from "@/components/tutors/tutor-list";

import AddLearnerModal from "@/components/modals/AddLearnerModal";
import RecentlyCalledTutors from "@/components/parents/recentlyCalledTutors";

const classData = [
  {
    image: "/images/tutor-3.png",
    title: "Basics of Algebra",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
  },
  {
    image: "/images/tutor-4.png",
    title: "Elements of UI/UX",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
  },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 lg:px-60 py-10 space-y-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[48px] font-bold text-[#2C1E1E] leading-tight">
            My Dashboard
          </h1>
          <p className="text-[#544E4E] text-lg mt-1">
            Are you ready to teach today?
          </p>
        </div>
        <Button className="bg-[#031D95] text-white rounded-full px-8 py-3 text-base font-medium">
          View Calendar
        </Button>
      </div>
      {/* Alert Banner */}
      <div className="bg-[#F6EFE9] rounded-xl flex flex-col lg:flex-row items-center justify-between px-6 py-5 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 text-sm">
          <div className="flex items-center gap-2 text-[#031D95] font-semibold">
            <Calendar className="w-4 h-4" />
            <span>You are off to a great start!</span>
          </div>
          <p className="text-[#3A3A3A]">
            You have completed your call with{" "}
            <span className="text-[#FFA300] font-semibold">J. P. Morgan</span>.
            Do they have what your child needs? Book a class to start learning!
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <Button className="bg-[#FFA300] text-white rounded-full px-6 py-3 text-sm font-semibold">
            Begin Class
          </Button>
          <button className="text-[#B82222] text-lg font-bold">&#x2715;</button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6 bg-[#f8f6f4]">
        {/* Upcoming Class */}
        <div className=" p-6 sm:p-10 rounded-2xl shadow-md w-full max-w-6xl mx-auto">
          <Tabs defaultValue="history" className="w-full">
            {/* Tabs Header */}
            <TabsList className="flex gap-10  pb-2 mb-6 border-gray-200 bg-transparent">
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

            {/* Tabs Content */}
            <TabsContent value="history" className="space-y-10">
              {classData.map((item, index) => (
                <div
                  key={index}
                  className={`flex w-full max-w-[852px] items-start justify-between gap-6 mx-auto ${
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
                  <div className="flex flex-col items-end justify-center gap-[22px] w-full">
                    <h2 className="text-[32px] font-medium text-[#2c241b] leading-normal font-['Montserrat'] flex items-start">
                      {item.title}
                    </h2>

                    <div className="flex flex-wrap items-start justify-between gap-6 w-full max-w-[656px]">
                      {/* Date */}
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

                      {/* Duration */}
                      <div className="flex flex-col gap-3 items-start">
                        <ClockIcon className="w-6 h-6 text-[#2c241b]" />
                        <div className="text-2xl font-medium text-[#2c241b] leading-[26.2px] font-['Montserrat'] whitespace-nowrap">
                          {item.duration}
                        </div>
                      </div>

                      <div className="hidden sm:block text-[64px] leading-none opacity-20 text-[#2c241b]">
                        |
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-3 items-start">
                        <BookOpenIcon className="w-6 h-6 text-[#2c241b]" />
                        <div className="text-2xl font-medium text-[#2c241b] leading-[26.2px] font-['Montserrat'] whitespace-nowrap">
                          {item.subject}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-start gap-[22px]">
                      <Button
                        variant="ghost"
                        className="px-10 py-0 h-auto rounded-full"
                      >
                        <span className="text-[#d43838] text-[16px] font-medium leading-[55px] whitespace-nowrap">
                          Cancel Class
                        </span>
                      </Button>

                      <Button className="px-10 py-0 h-auto bg-[#031d95] rounded-full">
                        <span className="text-white text-[16px] font-medium leading-[55px] whitespace-nowrap">
                          Reschedule Class
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Student List */}
        <div className="w-full rounded-2xl shadow-md p-6 bg-[#f8f6f4]  lg:max-w-[360px] flex flex-col justify-between">
          <div className="space-y-4">
            {[
              {
                name: "Layzee WokHad",
                age: "7yrs",
                grade: "Grade 7",
                bg: "bg-green-700",
                avatar: "/images/avatar-1.png", // optional: avatar or emoji
              },
              {
                name: "Layzee WokHad",
                age: "3yrs",
                grade: "Grade 2",
                bg: "bg-purple-700",
                avatar: "/images/avatar-2.png",
              },
            ].map((student, i) => (
              <div
                key={i}
                className={`text-white p-4 rounded-xl flex items-center justify-between ${student.bg}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                    👧
                  </div>
                  <div>
                    <p className="font-semibold text-base leading-tight">
                      {student.name}
                    </p>
                    <p className="text-sm">
                      {student.age} {student.grade}
                    </p>
                  </div>
                </div>
                <button className="text-white text-xl font-bold leading-none">
                  ⋮
                </button>
              </div>
            ))}
          </div>

          {/* Add Learner Section */}
          <div className="mt-10">
            <h3 className="text-[#FFA300] text-xl font-semibold leading-tight">
              Add another <br /> Learner today
            </h3>
            <p className="text-sm text-black mt-2">
              What are you learning today?
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full border border-[#031D95] text-[#031D95] rounded-full px-4 py-3 text-sm font-medium hover:bg-[#031D95] hover:text-white transition"
            >
              Add a Learner +
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-10">
        <RecentlyCalledTutors />
        <TutorList />
      </div>
      {/* Modal component at the bottom of the page */}
      <AddLearnerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
