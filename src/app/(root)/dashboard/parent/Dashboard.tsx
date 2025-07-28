import TutorList from "@/components/tutors/tutor-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BookOpenIcon, CalendarIcon, ClockIcon } from "lucide-react";
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
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex w-full bg-[#F8F7FC] px-6">
        <div className="w-full max-w-7xl mx-auto py-[60px] space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-[48px] font-medium text-[#2C1E1E] tracking-normal font-aero-trial">
                My Dashboard
              </h1>
              <p className="text-[#544E4E] text-lg mt-1">
                Are you ready to teach today?
              </p>
            </div>

            <Link href="/dashboard/parent/profile" passHref>
              <Button className="bg-secondary hover:bg-primary h-auto text-white rounded-full px-8 py-3 text-base font-medium">
                View Calendar
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
                <TabsContent value="upcoming" className="space-y-10">
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
                          <Button
                            variant="link"
                            className="px-10 py-0 h-auto rounded-full"
                          >
                            <span className="text-[#d43838] font-medium leading-[55px] whitespace-nowrap">
                              Cancel Class
                            </span>
                          </Button>

                          <Button className="px-10 py-0 h-auto bg-primary rounded-full hover:bg-secondary">
                            <span className="text-white font-medium leading-[55px] whitespace-nowrap">
                              Reschedule Class
                            </span>
                          </Button>
                        </div>
                      </div>
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
