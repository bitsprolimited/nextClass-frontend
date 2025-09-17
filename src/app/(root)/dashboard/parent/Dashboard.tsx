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
import UpcomingIntroductionTabs from "@/components/parents/upcoming-Introductory";

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
            <UpcomingIntroductionTabs />

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
