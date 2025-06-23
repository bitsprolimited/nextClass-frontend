import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  CircleDollarSign,
  Clock,
  Pencil,
} from "lucide-react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FiWatch } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

import AlertRotator from "@/components/alerts/AlertRotator";
import DashboardTabs from "@/components/tutors/DashboardTabs";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className=" min-h-screen p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              My Dashboard
            </h1>
            <p className="text-gray-600">Are you ready to teach today?</p>
          </div>
          <Button className="bg-[#031D95] text-white hover:bg-[#E39500] font-medium px-[40px] py-4 rounded-full mt-4 sm:mt-0">
            View Calendar
          </Button>
        </div>
        {/* Alert Box */}
        <div className="w-full max-w-5xl mx-auto">
          <AlertRotator />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-1 relative">
            <div className="flex gap-4 items-start mb-4">
              <div className="relative w-28 h-28">
                <Image
                  src="/images/ryan.png"
                  alt="Ryan Patterson"
                  fill
                  className="rounded-full  object-cover"
                />
                <p className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-green-600 font-bold text-sm">
                  ONLINE
                </p>
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Image
                      src="/images/USA.png"
                      alt="US Flag"
                      className="inline-block rounded-sm"
                      width={24}
                      height={24}
                    />
                    Ryan Patterson
                  </h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Pencil size={18} />
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  4.8/5 <span className="text-yellow-500">★★★★★</span> 200
                  Reviews
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="bg-purple-300 text-purple-800 text-sm px-2 py-1 rounded">
                    Grade 1-4
                  </span>
                  <span className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded">
                    Age 4-12
                  </span>
                  <span className="bg-orange-200 text-orange-800 text-sm px-2 py-1 rounded">
                    4 Subjects
                  </span>
                  <span className="bg-purple-300 text-purple-800 text-sm px-2 py-1 rounded">
                    Grade 1-4
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-6 text-gray-800 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> 30mins/class
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDollarSign size={16} /> $98/class
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> Mon - Sat
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <FiWatch /> 1 Ongoing Class
                  </div>
                  <div className="col-span-full flex items-center gap-2">
                    <BookOpen size={16} /> Mathematics. History. Physics. Music.
                  </div>
                  <div className="col-span-full text-sm text-right text-purple-300 font-semibold">
                    JOINED 29, MAY 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Panel */}
          <div className="bg-[#FFF5E9] rounded-xl shadow-md p-6 w-full lg:max-w-sm">
            <h3 className="text-xl font-semibold text-[#FFA300] mb-2">
              Welcome,{" "}
              <p className=" text-[#031D95] font-bold">Ryan Patterson</p>
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you ready to teach today?
            </p>

            <blockquote className="italic text-sm text-gray-600 mb-6">
              “Let’s focus on what we can do today, so that tomorrow, we will
              reap the harvest of today”
            </blockquote>

            <Button className="bg-blue-800 text-white font-medium w-full py-4 rounded-full mb-4">
              Create a New Course
            </Button>
            <Button className="w-full border bg-slate-200 border-blue-800 text-blue-800 font-medium py-4 rounded-full">
              Set Availability
            </Button>
          </div>
        </div>
        {/* Upcoming Class Card */}

        <div className="bg-[#FFF5E9] rounded-xl shadow-md p-6 mt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-6 w-full">
            {/* Left Section: Image & Label */}
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold text-blue-800 uppercase mb-2">
                Upcoming Class
              </p>
              <div className="w-24 h-24 rounded-lg overflow-hidden border">
                <Image
                  width={100}
                  height={100}
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1750369585211/a76b742d-4d91-4816-b17f-5c09eb3f3246.png"
                  alt="Class"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Center Section: Info */}
            <div className="flex-1 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Basics of Algebra
              </h3>
              <div className=" flex flex-col sm:flex-row gap-10 text-sm text-gray-800">
                {/* Date */}
                <div className="flex flex-col items-center text-center">
                  <MdOutlineCalendarMonth className="text-[24px] mb-1" />
                  <span className="text-[24px]">Mon, May 26</span>
                  <span className=" text-lg text-gray-500 mt-1">
                    9:00am - 9:30
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-gray-300 h-10 self-center" />

                {/* Duration */}
                <div className="flex flex-col items-center text-center">
                  <Clock className=" mb-1" />
                  <span className="text-[24px]">30mins</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-gray-300 h-10 self-center" />

                {/* Subject */}
                <div className="flex flex-col items-center text-center">
                  <IoBookOutline className=" text-[24px] mb-1" />
                  <span className=" text-[24px]">Mathematics</span>
                </div>
              </div>
            </div>

            {/* Right Section: Button */}
            <div className="mt-6 md:mt-0">
              <button className="bg-[#E39500] hover:bg-[#c47a00] text-white font-medium px-6 py-2 rounded-full transition duration-200">
                Reschedule Class
              </button>
            </div>
          </div>
        </div>
        <DashboardTabs />
      </div>
    </>
  );
}
