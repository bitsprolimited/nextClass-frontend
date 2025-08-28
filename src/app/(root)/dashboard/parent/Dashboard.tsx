import TutorList from "@/components/tutors/tutor-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BookOpenIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";

import AlertRotator from "@/components/alerts/AlertRotator";
import LearnersList from "@/components/parents/LearnersList";
import RecentlyCalledTutors from "@/components/parents/recentlyCalledTutors";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import HowItWorksSection from "@/components/landing/how-it-works";
import { Separator } from "@/components/ui/separator";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";

const classData = [
  {
    image: "/images/tutor-3.png",
    title: "Basics of Algebra",
    teacher: "David Patterson",
    student: "James Patterson",
    grade: "Grade 11",
    subject: "Mathematics",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
  },
  {
    image: "/images/tutor-2.png",
    title: "Elements of UI/UX",
    teacher: "David Patterson",
    student: "James Patterson",
    grade: "Grade 11",
    subject: "Mathematics",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
  },
];

export default function Dashboard() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex w-full bg-[#F8F7FC] px-6">
        <div className="w-full max-w-7xl mx-auto py-[60px] space-y-10">
          <div className="flex  md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <div>
              <h1 className="text-[20px] md:text-[48px] font-medium text-[#2C1E1E] tracking-normal font-aero-trial">
                My Dashboard
              </h1>
              <p className="text-[#544E4E] text-base md:text-lg mt-1">
                Are you ready to teach today?
              </p>
            </div>

            <Link href="/dashboard/parent/profile" passHref>
              <Button className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white rounded-full px-6 py-2 md:px-8 md:py-3 text-[12px] md:text-base font-medium w-full md:w-auto">
                View Schedule
              </Button>
            </Link>
          </div>

          {/* Alert Banner */}
          <AlertRotator />

          {/* Main Dashboard Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Upcoming Class */}
            <div className="bg-[#f8f6f4] p-6 sm:p-10 rounded-2xl shadow-md w-full max-w-6xl mx-auto">
              <Tabs defaultValue="upcoming" className="w-full">
                {/* Tabs Header */}
                <TabsList className="flex gap-10  pb-2 mb-6 border-gray-200 bg-transparent">
                  <TabsTrigger
                    value="upcoming"
                    className="text-xs text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 uppercase"
                  >
                    Upcoming Classes
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="text-xs text-gray-600 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 uppercase"
                  >
                    Class History
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent
                  value="upcoming"
                  className="space-y-6 sm:space-y-10"
                >
                  {classData.map((item, index) => (
                    <div
                      key={index}
                      className={`flex  sm:flex-row w-full max-w-[852px] sm:items-start gap-4 sm:gap-6 mx-auto rounded-xl p-4 sm:p-6 ${
                        index > 0 ? "mt-4 sm:mt-8" : ""
                      }`}
                      style={{ background: "transparent" }}
                    >
                      {/* Class Image */}
                      <div className="relative w-[100px] h-[100px] sm:w-[144px] sm:h-[144px] rounded-lg border border-[#AEA2A2] overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt="Class"
                          fill
                          className="object-cover size-full rounded-lg"
                        />
                      </div>

                      {/* Class Content */}
                      <div className="flex flex-col gap-2 w-full">
                        {/* Title */}
                        <h2 className="text-[16px] sm:text-[24px] md:text-[28px] font-normal text-[#2C1E1E] leading-tight font-aero-trial mb-1">
                          {item.subject} Class with{" "}
                          <span className="font-bold">{item.teacher}</span>
                        </h2>

                        {/* Learner & Tutor */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#2C1E1E] text-[16px] sm:text-[24px] mb-2">
                          <span className="flex items-center gap-1 sm:gap-2">
                            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {item.student}
                          </span>
                          <span className="hidden sm:inline mx-2">|</span>
                          <span className="flex items-center gap-1 sm:gap-2">
                            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {item.teacher}
                          </span>
                        </div>

                        {/* Date & Time */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#2C1E1E] text-[16px] sm:text-[24px] mb-2">
                          <span className="flex items-center gap-1 sm:gap-2">
                            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {item.date}
                          </span>
                          <span className="hidden sm:inline mx-2">|</span>
                          <span className="flex items-center gap-1 sm:gap-2">
                            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {item.time}
                          </span>
                        </div>

                        {/* Grade & Subject */}
                        <div className="text-[#A7A7A7] text-[14px] sm:text-[24px] font-medium mb-2">
                          {item.grade} &middot; {item.subject}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 mt-2 sm:mt-0">
                          <button
                            type="button"
                            className="bg-transparent text-[#d43838] text-sm sm:text-base font-medium px-4 py-2 rounded-full hover:underline"
                          >
                            Cancel
                          </button>
                          <Button className="bg-[#031D95] text-white text-sm sm:text-base font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-[#001E62]">
                            Reschedule Class
                          </Button>
                        </div>
                      </div>
                      {index < classData.length - 1 && (
                        <hr className="border-t border-gray-700" />
                      )}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="history" className="space-y-10">
                  {classData.map((item, index) => (
                    <div
                      key={index}
                      className={`flex w-full max-w-[852px] items-start justify-between gap-6 mx-auto ${
                        index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
                      }`}
                    >
                      {/* Class Image */}
                      <div className="relative w-36 h-36 rounded-[10px] border border-[#AEA2A2]">
                        <Image
                          src={item.image}
                          alt="Class"
                          fill
                          className="object-cover size-full rounded-[10px]"
                        />
                      </div>

                      {/* Class Content */}
                      <div className="flex flex-col justify-center gap-[22px] w-full">
                        <h2 className="text-[32px] font-medium text-zeus leading-normal font-montserrat flex items-start">
                          {item.title}
                        </h2>

                        <div className="flex flex-wrap items-center justify-between gap-6 w-full max-w-[656px]">
                          {/* Date */}
                          <div className="flex flex-col gap-3 items-start">
                            <CalendarIcon className="w-6 h-6 text-zeus" />
                            <div className="text-2xl font-medium text-zeus leading-[26.2px] font-montserrat">
                              {item.date}
                              <br />
                              <span className="text-xl text-[#2c241b99]">
                                {item.time}
                              </span>
                            </div>
                          </div>

                          <Separator
                            orientation="vertical"
                            className="h-[60px] bg-zeus opacity-20 border"
                          />

                          {/* Duration */}
                          <div className="flex flex-col gap-3 items-start">
                            <ClockIcon className="w-6 h-6 text-zeus" />
                            <div className="text-2xl font-medium text-zeus leading-[26.2px] font-montserrat whitespace-nowrap">
                              {item.duration}
                            </div>
                          </div>

                          <Separator
                            orientation="vertical"
                            className="h-[60px] bg-zeus opacity-20 border"
                          />

                          {/* Subject */}
                          <div className="flex flex-col gap-3 items-start">
                            <BookOpenIcon className="w-6 h-6 text-zeus" />
                            <div className="text-2xl font-medium text-zeus leading-[26.2px] font-montserrat whitespace-nowrap">
                              {item.subject}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-start gap-[22px] ml-auto">
                          <Button className="px-10 py-0 h-auto bg-primary rounded-full hover:bg-secondary">
                            <span className="text-white font-medium leading-[55px] whitespace-nowrap">
                              View lesson note
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
            <LearnersList learners={user?.user?.children} />
          </div>
        </div>
      </div>
      <div className="pt-10 bg-white">
        <RecentlyCalledTutors />
        <TutorList />
        <HowItWorksSection />
      </div>
    </div>
  );
}
