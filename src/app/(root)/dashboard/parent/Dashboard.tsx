"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import FeaturedTutors from "@/components/landing/featured-tutors";
import TutorList from "@/components/tutors/tutor-list";

import AddLearnerModal from "@/components/modals/AddLearnerModal";

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
    image: "/images/tutor-2.png",
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Upcoming Class */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md w-full max-w-6xl mx-auto">
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
            <TabsContent value="history" className="divide-y divide-gray-200">
              {classData.map((item, index) => (
                <div key={index} className="py-8 first:pt-0">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 w-full">
                      <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border">
                        <Image
                          src={item.image}
                          alt="Class"
                          width={90}
                          height={90}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1 pl-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <div className=" flex flex-col sm:flex-row gap-10 text-sm text-gray-800">
                          <div className="flex flex-col items-center text-center">
                            <MdOutlineCalendarMonth className="text-[24px] mb-1" />
                            <span className="text-[24px]">{item.date}</span>
                            <span className=" text-lg text-gray-500 mt-1">
                              {item.time}
                            </span>
                          </div>

                          <div className="hidden sm:block w-px bg-gray-300 h-10 self-center" />

                          <div className="flex flex-col items-center text-center">
                            <Clock className=" mb-1" />
                            <span className="text-[24px]">{item.duration}</span>
                          </div>

                          <div className="hidden sm:block w-px bg-gray-300 h-10 self-center" />

                          <div className="flex flex-col items-center text-center">
                            <IoBookOutline className=" text-[24px] mb-1" />
                            <span className=" text-[24px]">{item.subject}</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                          <Button className="bg-white text-red-500 hover:bg-[#FFA300] rounded-full px-6 py-4 text-sm font-medium">
                            Cancel Class
                          </Button>

                          <Button className="bg-[#031D95] text-white rounded-full px-6 py-4 text-sm font-medium">
                            Reschedule Class
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Student List */}
        <div className="w-full rounded-2xl shadow-md p-6 bg-white lg:max-w-[270px] flex flex-col justify-between">
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
        <FeaturedTutors />
        <TutorList />
      </div>
      {/* Modal component at the bottom of the page */}
      <AddLearnerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
